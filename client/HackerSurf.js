Template.body.helpers({
	jobs: function() {
		if(Session.get("allSites")) {
			return Scrapes.find({}, {sort: {sitename: 1}});
		} else {
			return Scrapes.find({}, {sort: {sitename: 1}});
		}
	},
	allSitesSession: function() {
		return ((Session.get("allSites") === undefined) ? true : Session.get("allSites"));
	},
	jobsites: function() {
		return Scrapes.find({}, { url: 1, sitename: 1, _id: 0 });
	},
	jobscount: function() {
		var scrapes = Scrapes.find({}, { jobscount:1, _id: 0 }).fetch();
		var jobscount = 0;
		scrapes.forEach(function(scrape) {
			jobscount += scrape.jobscount;
		});
		return jobscount;
	}
});

Template.body.events({
	"change .all-sites-check input": function (event) {
    	Session.set("allSites", event.target.checked);
    }
});

Template.jobsite.events({
	"change input": function (event) {
		Session.set("activeSites." + event.target.name, event.target.checked);
    	console.log(Session.get("activeSites"));
    }
});

Template.jobsite.helpers({
	
});