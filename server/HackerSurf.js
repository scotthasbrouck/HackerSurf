cheerio = Meteor.npmRequire('cheerio');

Meteor.startScrape = function() {
	for (var i = 0; i < Meteor.scrapes.length; i++) {
		Meteor.scrapeJobs(Meteor.scrapes[i]);
	}
};

Meteor.scrapeJobs = function(jobsite) {
	var thisjob = Object.create(jobsite);
	//setInterval(function(){
		result = Meteor.http.get(thisjob.url, {timeout:30000});
		$ = cheerio.load(result.content);
		
		var titles = [];
		var engagements = [];
		var locations = [];
		var links = [];
		var jobs = [];

		$(thisjob['titles']).each(function() {
			titles.push($(this).text());
		});
		$(thisjob['engagements']).each(function() {
			engagements.push($(this).text());
		});
		$(thisjob['locations']).each(function() {
			locations.push($(this).text());
		});
		$(thisjob['links']).each(function() {
			if($(this).attr('href').substring(0,4) === 'http') {
				links.push($(this).attr('href'));
			} else {
				links.push(jobsite['linkprefix'] + $(this).attr('href'));
			}
		});


		for(var i = 0; i < titles.length; i++) {
			jobs.push({
				title: titles[i],
				engagement: engagements[i],
				location: locations[i],
				link: links[i]
			});
		}

		if(Scrapes.find({ url:thisjob.url }).count()) {
			console.log('update ' + thisjob.url);
			Scrapes.update({
				url:thisjob.url 
			}, {
				$set: {
					updatedAt: new Date(),
					icon: thisjob.icon,
					jobs: jobs
				}
			});
		} else {
			console.log('insert ' + thisjob.url);
			Scrapes.insert({
				url: thisjob.url,
				sitename: thisjob.sitename,
				createdAt: new Date(),
				icon: thisjob.icon,
				jobs: jobs
			});
		}
	//}, thisjob.timeout);
};

Meteor.startup(function () {
  	Meteor.startScrape();
 });