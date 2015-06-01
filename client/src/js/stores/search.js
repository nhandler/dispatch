var Reflux = require('reflux');
var Immutable = require('immutable');

var actions = require('../actions/search');

var Search = Immutable.Record({
	show: false,
	results: Immutable.List()
});

var search = new Search();

function getState() {
	return search;
}

var searchStore = Reflux.createStore({
	init() {
		this.listenToMany(actions);
	},

	searchDone(results) {
		search = search.set('results', Immutable.List(results));
		this.trigger(search);
	},

	toggle() {
		search = search.set('show', !search.show);
		this.trigger(search);
	},

	getInitialState: getState,
	getState
});

module.exports = searchStore;