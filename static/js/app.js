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
    var newFeatureStruct;

    this.addNewFeature = function() {
        newFeatureStruct = {
            title: this.title(),
            desc: this.desc(),
            priority: this.priority(),
            date: this.target_date(),
            area: this.area()
        }
        if(this.client() == "a") {
            this.clientAList(reorder(this.priority(), this.clientAList()));
            this.clientAList.push(newFeatureStruct);
            this.clientAList.sort(compare);
        }
        else if(this.client() == "b") {
            this.clientBList.push(newFeatureStruct)
            this.clientBList.sort(compare);
        }
        else {
            this.clientCList.push(newFeatureStruct)
            this.clientCList.sort(compare);
        }
    }
}

function compare(a,b) {
    const prioA = a;
    const prioB = b;
    return prioA.priority - prioB.priority;
}

function reorder(priority, clientList) {
    console.log(clientList);
    var newClientList;
    var index = -1;
    for (var i = 0; i < clientList.length; i++) {
        if (priority == clientList[i].priority) {
            for (j = i; j < clientList.length; j++) {
                x = Number(clientList[j].priority) + 1;
                clientList[j].priority = String(x);
            }
            break;
        }
    }
    return clientList;
}

ko.applyBindings(new viewModel());
