cheerio = Meteor.npmRequire('cheerio');
interval = 300000; // 5 mins

 function startScrape() {
	for (var i = 0; i < Meteor.scrapes.length; i++) {
		var thisjob = Object.create(Meteor.scrapes[i]);
		scrapeMethod(thisjob);
	}
};

function scrapeMethod(thisjob) {
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
			links.push(thisjob['linkprefix'] + $(this).attr('href'));
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
}

Meteor.startup(function () {
	startScrape(); //call once to initiate
  	Meteor.setInterval(startScrape, interval); //then every internal
 });