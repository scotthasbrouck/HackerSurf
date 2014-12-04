// Scott Hasbrouck (C) 2014
// CC0 license: http://creativecommons.org/publicdomain/zero/1.0/
// http://scotthasbrouck.com
// Client Code

Meteor.startup(function() {
	if (Session.get("checkedSitesCount") === undefined) {
		Session.set("allSites", true);
	}
});

// db call to get jobs and jobsites
var filteredJobSites = function(setSession, returnCount, returnSiteCount, setAllChecked, setAllUnchecked) {
	var jobsites = Scrapes.find({}, { url: 1, sitename: 1, _id: 0, sort: {sitename: 1} }).fetch();
	var jobscount = 0;
	var checkedJobSites = 0;
	jobsites.forEach(function(jobsite) {
		siteActive = Session.get("activeSites." + jobsite.url);
		jobsite.checked = (setAllChecked || Session.get("allSites")) ? true : (setAllUnchecked ? !setAllUnchecked : (siteActive !== undefined ? siteActive : false));
		if (jobsite.checked) {
			checkedJobSites++;
			if (returnCount) {
				jobscount += jobsite.jobscount;
			}
		}
		if (setSession) {
			Session.setPersistent("activeSites." + jobsite.url, jobsite.checked);
			Session.setPersistent("checkedSitesCount", checkedJobSites);
		}
	});
	return (returnCount) ? jobscount : (returnSiteCount) ? checkedJobSites : jobsites;
};

// Helpers
Template.body.helpers({
	jobs: filteredJobSites,
	allSitesSession: function() {
		return (Session.get("allSites") === undefined) ? false : Session.get("allSites");
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
			} else {
				filteredJobSites(true, false, false, false, true);
			}
		}
});

Template.jobsite.events({
	"change input": function (event) {
		Session.setPersistent("activeSites." + event.target.name, event.target.checked);
		if (!event.target.checked) {
			Session.set("allSites", false);
		}
	}
});

// Subscribe
Meteor.subscribe("scrapes");
