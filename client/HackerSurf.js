Template.body.helpers({
	jobs: function() {
		return Scrapes.find();
	}
});