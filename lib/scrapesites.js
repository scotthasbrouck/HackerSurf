Meteor.scrapes = [
	{
		'sitename': 'Smashing Magazine',
		'url': 'http://jobs.smashingmagazine.com/all/programming',
		'titles': 'article.entry h2',
		'engagements': 'article.entry .entry-type',
		'locations': 'article.entry .entry-company',
		'company': '',
		'links': '.entry-list li a',
		'linkprefix': '',
		'timeout': 1000,
		'pageindex': '',
		'maxpage': '',
		'icon': 'smashing-magazine'
	},
	{
		'sitename': 'Y Combinator',
		'url': 'https://news.ycombinator.com/jobs',
		'titles': '.title a',
		'engagements': '',
		'locations': '.title .comhead',
		'company': '',
		'links': '.title a',
		'linkprefix': 'https://news.ycombinator.com/',
		'timeout': 1000,
		'pageindex': '',
		'maxpage': '',
		'icon': 'ycombinator'
	},
	{
		'sitename': 'Stack Overflow',
		'url': 'http://careers.stackoverflow.com/jobs',
		'titles': '.-title a',
		'engagements': '',
		'locations': '.-employer',
		'company': '',
		'links': '.-title a',
		'linkprefix': 'http://careers.stackoverflow.com',
		'timeout': 1000,
		'pageindex': 'pg',
		'maxpage': '9',
		'icon': 'stackoverflow'
	}/*,
	{
		'sitename': 'Github',
		'url': 'https://jobs.github.com/positions',
		'titles': '.title a',
		'engagements': '',
		'locations': 'span.location',
		'company': '.company',
		'links': 'h4 a',
		'linkprefix': 'https://jobs.github.com',
		'timeout': 1000,
		'pageindex': '',
		'maxpage': '',
		'icon': ''
	}*/
];