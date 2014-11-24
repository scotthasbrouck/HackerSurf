Template.body.helpers({
	jobs: function() {
		return Scrapes.find();
	}
});


Template.body.events({
	"click #all-sites": function (event) {
		console.log(event.target.checked);
		Session.set("showAllSites", event.target.checked);
	}
});
