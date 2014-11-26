//db call to get jobs and jobsites
var filteredJobSites = function(setSession, returnCount, returnSiteCount, setAllChecked) {
	var jobsites = Scrapes.find({}, { url: 1, sitename: 1, _id: 0, sort: {sitename: 1} }).fetch();
	var jobscount = 0;
	var checkedJobSites = 0;
	jobsites.forEach(function(jobsite) {
		jobsite.checked = ((setAllChecked) ? true : ((Session.get("activeSites." + jobsite.url) === undefined) ? true : Session.get("activeSites." + jobsite.url)));
		if(setSession) {
			Session.set("activeSites." + jobsite.url, jobsite.checked);
		}
		if (jobsite.checked) {
			checkedJobSites++;
			if (returnCount) {
				jobscount += jobsite.jobscount;
			}
		}
	});
	return (returnCount) ? jobscount : (returnSiteCount) ? checkedJobSites : jobsites;
};

//helpers
Template.body.helpers({
	jobs: filteredJobSites,
	allSitesSession: function() {
		return ((Session.get("allSites") === undefined) ? true : Session.get("allSites"));
	},
	jobscount: function() {
		return filteredJobSites(false, true);
	},
	jobsitescount: function() {
		return filteredJobSites(false, false, true);
	},
	jobsites: function() {
		return filteredJobSites(true);
	}
});

//events
Template.body.events({
	"change .all-sites-check input": function (event) {
    	Session.set("allSites", event.target.checked);
    	if (event.target.checked) {
    		filteredJobSites(true, false, false, true);
    	}
    }
});

Template.jobsite.events({
	"change input": function (event) {
		Session.set("activeSites." + event.target.name, event.target.checked);
		if(!event.target.checked) {
			Session.set("allSites", false);
		}
    }
});