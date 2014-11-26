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
	jobscount: function() {
		var jobsites = Scrapes.find({}, { jobscount:1, _id: 0 }).fetch();
		var jobscount = 0;
		jobsites.forEach(function(jobsite) {
			jobscount += jobsite.jobscount;
		});
		return jobscount;
	},
	jobsitescount: function() {
		return Scrapes.find({}, { url: 1, sitename: 1, _id: 0 }).fetch().length;
	},
	jobsites: function() {
		var jobsites = Scrapes.find({}, { url: 1, sitename: 1, _id: 0 }).fetch();
		jobsites.forEach(function(jobsite) {
			console.log(Session.get("activeSites." + jobsite.url));
			jobsite.checked = ((Session.get("activeSites." + jobsite.url) === undefined) ? true : Session.get("activeSites." + jobsite.url));
		});
		return jobsites;
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