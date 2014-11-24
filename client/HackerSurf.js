Template.body.helpers({
	jobs: function() {
		return Scrapes.find();
	},
	allSites: function() {
		return ((Session.get("allSites") === undefined) ? true : Session.get("allSites"));
	}
});


Template.body.events({
	"change .all-sites-check input": function (event) {
    	Session.set("allSites", event.target.checked);
    }
});
