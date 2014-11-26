cheerio = Meteor.npmRequire('cheerio');
interval = 300000; // 5 mins

 function startScrape() {
	for (var i = 0; i < Meteor.scrapes.length; i++) {
		var jobsite = Object.create(Meteor.scrapes[i]);
		scrapeMethod(jobsite);
	}
};

function scrapeMethod(jobsite) {
	result = Meteor.http.get(jobsite.url, {timeout:30000});
	$ = cheerio.load(result.content);

	var jobs = [];

	$(jobsite['container']).each(function() {
		var href = $(this).find(jobsite['links']).eq(0).attr('href');
		jobs.push({
			title: $(this).find(jobsite['titles']).eq(0).text() || '',
			engagement: $(this).find(jobsite['engagements']).eq(0).text() || '',
			location: $(this).find(jobsite['locations']).eq(0).text() || '',
			company: $(this).find(jobsite['companies']).eq(0).text() || '',
			link: ((href.substring(0,4) === 'http') ? href : jobsite['linkprefix'] + href) || ''
		});
	});
	saveJobs(jobsite, jobs);
}

function saveJobs(jobsite, jobs) {
	if(Scrapes.find({ url:jobsite.url }).count()) {
		console.log('update ' + jobsite.url);
		Scrapes.update({
			url:jobsite.url 
		}, {
			$set: {
				url: jobsite.url,
				sitename: jobsite.sitename,
				updatedAt: new Date(),
				icon: jobsite.icon,
				jobs: jobs,
				jobscount: jobs.length
			}
		});
	} else {
		console.log('insert ' + jobsite.url);
		Scrapes.insert({
			url: jobsite.url,
			sitename: jobsite.sitename,
			createdAt: new Date(),
			icon: jobsite.icon,
			jobs: jobs,
			jobscount: jobs.length
		});
	}
}

Meteor.startup(function () {
	startScrape(); //call once to initiate
  	Meteor.setInterval(startScrape, interval); //then every internal
 });
