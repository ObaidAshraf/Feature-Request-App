function viewModel() {

    this.title = ko.observable();
    this.desc = ko.observable();
    this.client = ko.observable();
    this.priority = ko.observable();
    this.target_date = ko.observable();
    this.area = ko.observable();
    this.clientAList = ko.observableArray([]);
    this.clientBList = ko.observableArray([]);
    this.clientCList = ko.observableArray([]);

    this.addNewFeature = function() {
        if(this.client() == "a") {
            this.clientAList.push({
                title: this.title(),
                desc: this.desc(),
                priority: this.priority(),
                date: this.target_date(),
                area: this.area()
            })
        }
        else if(this.client() == "b") {
            this.clientBList.push({
                title: this.title(),
                desc: this.desc(),
                priority: this.priority(),
                date: this.target_date(),
                area: this.area()
            })
        }
        else {
            this.clientCList.push({
                title: this.title(),
                desc: this.desc(),
                priority: this.priority(),
                date: this.target_date(),
                area: this.area()
            })
        }
    }

}
ko.applyBindings(new viewModel());