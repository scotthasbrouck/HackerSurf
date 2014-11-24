Meteor.scrapes = [
	{
		'sitename': 'Y Combinator',
		'url': 'https://news.ycombinator.com/jobs',
		'container': 'td.title:last-child',
		'titles': 'a',
		'engagements': '',
		'locations': '',
		'companies': '.comhead',
		'links': 'a',
		'linkprefix': 'https://news.ycombinator.com/',
		'pageindex': '',
		'maxpage': '',
		'icon': 'ycombinator'
	},
	{
		'sitename': 'Smashing Magazine',
		'url': 'http://jobs.smashingmagazine.com/all/programming',
		'container': '.entry-list li',
		'titles': 'article.entry h2',
		'engagements': 'article.entry .entry-type',
		'locations': '',
		'companies': ' article.entry .entry-company',
		'links': 'a',
		'linkprefix': '',
		'pageindex': '',
		'maxpage': '',
		'icon': 'smashing-magazine'
	},
	{
		'sitename': 'Stack Overflow',
		'url': 'http://careers.stackoverflow.com/jobs',
		'container': '.-job',
		'titles': 'a.job-link',
		'engagements': '',
		'locations': '.location',
		'companies': '',
		'links': 'a.job-link',
		'linkprefix': 'http://careers.stackoverflow.com',
		'pageindex': 'pg',
		'maxpage': '9',
		'icon': 'stackoverflow'
	},
	{
		'sitename': 'Github',
		'url': 'https://jobs.github.com/positions',
		'container': '.positionlist tr:not(.pagination)',
		'titles': '.title a',
		'engagements': 'p.source strong',
		'locations': 'span.location',
		'companies': '.company',
		'links': '.title a',
		'linkprefix': 'https://jobs.github.com',
		'pageindex': '',
		'maxpage': '',
		'icon': 'github'
	}
];