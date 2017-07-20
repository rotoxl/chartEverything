export const Tabletop={
	init(key, simpleSheet, callback){
		this.key=key
		this.callback=callback
		this.simpleSheet=simpleSheet

		//https://docs.google.com/spreadsheets/d/1UTa3XS4UlCwg9LHdIVgpcOyspVqrplP1ZKwzDBL9Q-A/pubhtml
		if(/pubhtml/.test(this.key)) {
			this.log("You passed a new Google Spreadsheets url as the key! Attempting to parse.")
			
			if ( (de=this.key.match("d\\/e\\/(.*?)\\/pubhtml")).length)
				this.key=de[1]
			else if ( (de=this.key.match("d\\/(.*?)\\/pubhtml")).length)
				this.key = de[1]
		}

		this.wanted = []
		this.endpoint="https://spreadsheets.google.com"
		this.models = {}
		this.model_names = []
		this.base_json_path = "/feeds/worksheets/" + this.key + "/public/basic?alt="
		this.base_json_path += 'json'

		this.requestData(this.base_json_path, this.loadSheets)
	},
	log(l){
		console.log(l)
	},
	isWanted: function(sheetName) {
      	if(this.wanted.length === 0) {
        	return true
      	} else {
        	return (this.wanted.indexOf(sheetName) !== -1)
      	}
    },
	xhrFetch(path, callback) {
		var xhr =  new XMLHttpRequest();
		xhr.open("GET", this.endpoint + path)
		var self = this;
		xhr.onload = function() {
			try {
				var json = JSON.parse(xhr.responseText);
			} catch (e) {
				console.log('Contenido erroneo')
				console.log(xhr.responseText)
			}
			callback.call(self, json)
		}
		xhr.send()
	},
	requestData(path, callback){
		this.xhrFetch(path, callback)
	},
	loadSheets(data){
		var i, ilen
		var toLoad = []
		this.foundSheetNames = []

		for(i = 0, ilen = data.feed.entry.length; i < ilen ; i++) {
			this.foundSheetNames.push(data.feed.entry[i].title.$t);
			// Only pull in desired sheets to reduce loading
			if( this.isWanted(data.feed.entry[i].content.$t) ) {
				var linkIdx = data.feed.entry[i].link.length-1;
				var sheet_id = data.feed.entry[i].link[linkIdx].href.split('/').pop();
				var json_path = "/feeds/list/" + this.key + "/" + sheet_id + "/public/values?alt="

				json_path += 'json'
				toLoad.push(json_path)
			}
		}

		this.sheetsToLoad = toLoad.length
		for(i = 0, ilen = toLoad.length; i < ilen; i++) {
			this.requestData(toLoad[i], this.loadSheet);
		}
	},
	loadSheet(data){
		var that = this;
		var model = new Tabletop.Model( { data: data,
	        parseNumbers: true,
	        postProcess: false,
	        tabletop: this,
	        prettyColumnNames: true,
	        onReady: function() {
	          that.sheetReady(this)
	        } } )
	},
	sheetReady(model){
		this.models[ model.name ] = model;
		if(this.model_names.indexOf(model.name) === -1) {
			this.model_names.push(model.name)
		}

		this.sheetsToLoad--
		if(this.sheetsToLoad === 0)
			this.doCallback()
	},
	doCallback() {
		if(this.sheetsToLoad === 0) {
			this.callback.apply(this.callbackContext || this, [this.data(), this]);
		}
	},
	data(){
		// If the instance is being queried before the data's been fetched
		// then return undefined.
		if(this.model_names.length === 0) {
			return undefined
		}
		if(this.simpleSheet) {
			if(this.model_names.length > 1 && this.debug) {
				this.log("WARNING You have more than one sheet but are using simple sheet mode! Don't blame me when something goes wrong.");
			}
			return this.models[ this.model_names[0] ].all()
		} else {
			return this.models
		}
	}
}

Tabletop.Model = function(options) {
    var i, j, ilen, jlen;
    this.columnNames = [];
    this.column_names = this.columnNames; // jshint ignore:line
    this.name = options.data.feed.title.$t;
    this.tabletop = options.tabletop;
    this.elements = [];
    this.onReady = options.onReady;
    this.raw = options.data; // A copy of the sheet's raw data, for accessing minutiae

    if (typeof(options.data.feed.entry) === 'undefined') {
      options.tabletop.log('Missing data for ' + this.name + ', make sure you didn\'t forget column headers');
      this.originalColumns = [];
      this.elements = [];
      this.onReady.call(this);
      return;
    }

    for (var key in options.data.feed.entry[0]){
      if (/^gsx/.test(key)) {
        this.columnNames.push(key.replace('gsx$',''));
      }
    }

    this.originalColumns = this.columnNames;
    this.original_columns = this.originalColumns; // jshint ignore:line

    var toNumber=function (d){
    	try{
    		return Number(d.replace(',', '.'))
    	} catch(e){
    		return d
    	}
    }

    for (i = 0, ilen =  options.data.feed.entry.length ; i < ilen; i++) {
      var source = options.data.feed.entry[i];
      var element = {};
      for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        var cell = source['gsx$' + this.columnNames[j]];
        if (typeof(cell) !== 'undefined') {
        	var cell_value=cell.$t
        	var cell_value_number=toNumber(cell.$t)
          if (this.columnNames[j]=='value')
          	element[this.columnNames[j]] = cell_value_number
          else if (options.parseNumbers && cell_value !== '' && !isNaN(cell_value)) {
            element[this.columnNames[j]] = cell_value_number
          } else {
            element[this.columnNames[j]] = cell_value
          }
        } else {
          element[this.columnNames[j]] = '';
        }
      }
      if (element.rowNumber === undefined) {
        element.rowNumber = i + 1;
      }

      if (options.postProcess) {
        options.postProcess(element);
      }

      this.elements.push(element);
    }

    if (options.prettyColumnNames) {
      this.fetchPrettyColumns();
    } else {
      this.onReady.call(this);
    }
  };
Tabletop.Model.prototype = {
    /*
      Returns all of the elements (rows) of the worksheet as objects
    */
    all: function() {
      return this.elements;
    },

    fetchPrettyColumns: function() {
      if (!this.raw.feed.link[3]) {
        return this.ready();
      }

      var cellurl = this.raw.feed.link[3].href.replace('/feeds/list/', '/feeds/cells/').replace('https://spreadsheets.google.com', '');
      var that = this;
      this.tabletop.requestData(cellurl, function(data) {
        that.loadPrettyColumns(data);
      });
    },

    ready: function() {
      this.onReady.call(this);
    },

    /*
     * Store column names as an object
     * with keys of Google-formatted "columnName"
     * and values of human-readable "Column name"
     */
    loadPrettyColumns: function(data) {
      var prettyColumns = {};

      var columnNames = this.columnNames;

      var i = 0;
      var l = columnNames.length;

      for (; i < l; i++) {
        if (typeof data.feed.entry[i].content.$t !== 'undefined') {
          prettyColumns[columnNames[i]] = data.feed.entry[i].content.$t;
        } else {
          prettyColumns[columnNames[i]] = columnNames[i];
        }
      }

      this.prettyColumns = prettyColumns;
      this.pretty_columns = this.prettyColumns; // jshint ignore:line
      this.prettifyElements();
      this.ready();
    },

    /*
     * Go through each row, substitutiting
     * Google-formatted "columnName"
     * with human-readable "Column name"
     */
    prettifyElements: function() {
      var prettyElements = [],
          orderedPrettyNames = [],
          i, j, ilen, jlen;

      for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        orderedPrettyNames.push(this.prettyColumns[this.columnNames[j]]);
      }

      for (i = 0, ilen = this.elements.length; i < ilen; i++) {
        var newElement = {};
        for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
          var newColumnName = this.prettyColumns[this.columnNames[j]];
          newElement[newColumnName] = this.elements[i][this.columnNames[j]];
        }
        prettyElements.push(newElement);
      }
      this.elements = prettyElements;
      this.columnNames = orderedPrettyNames;
    },

    /*
      Return the elements as an array of arrays, instead of an array of objects
    */
    toArray: function() {
      var array = [],
          i, j, ilen, jlen;
      for (i = 0, ilen = this.elements.length; i < ilen; i++) {
        var row = [];
        for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
          row.push(this.elements[i][ this.columnNames[j]]);
        }
        array.push(row);
      }

      return array;
    }
  }
