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

    this.getAllFeatures = ko.computed(function() {
        var self = this;
        return $.ajax({
            url: '/getFeatures',
            contentType: 'application/json',
            type: 'GET',
            success: function(data) {
                _data_client_A = JSON.parse(data)[0][1];
                _data_json_cA =  JSON.parse(_data_client_A);
                _data_len_cA = _data_json_cA.length
                for (var i = 0; i < _data_len_cA; i++) {
                    self.clientAList.push(_data_json_cA[i])
                }
                return
            },
            error: function() {
                return console.log("Errrr !!")
            }
        });
    }, this)

    this.addNewFeature = function() {
        newFeatureStruct = {
            title: ko.observable(this.title()),
            desc: ko.observable(this.desc()),
            priority: ko.observable(this.priority()),
            date: ko.observable(this.target_date()),
            area: ko.observable(this.area())
        }
        if(this.client() == "a") {
            //reorder(this.priority(), this.clientAList());
            this.clientAList.push(newFeatureStruct);
            this.clientAList.sort(compare);
            var json_data = ko.toJSON(view_model)
            var list_data = JSON.stringify(JSON.parse(json_data)["clientAList"]);
            console.log(list_data)
            return $.ajax({
                url: '/newFeature',
                contentType: 'application/json',
                type: 'POST',
                data: list_data,
                success: function(data) {
                    console.log("Data Pushed Successfully.")
                    return
                },
                error: function() {
                    return console.log("Errrr !!")
                }
            });
        }
        else if(this.client() == "b") {
            reorder(this.priority(), this.clientBList());
            this.clientBList.push(newFeatureStruct)
            this.clientBList.sort(compare);
            var json_data = ko.toJSON(view_model)
            var list_data = JSON.stringify(JSON.parse(json_data)["clientBList"]);
            console.log(list_data)
        }
        else {
            reorder(this.priority(), this.clientCList());
            this.clientCList.push(newFeatureStruct)
            this.clientCList.sort(compare);
            var json_data = ko.toJSON(view_model)
            var list_data = JSON.stringify(JSON.parse(json_data)["clientCList"]);
            console.log(list_data)
        }
    }

}

function compare(a,b) {
    const prioA = a;
    const prioB = b;
    return prioA.priority() - prioB.priority();
}

function reorder(priority, clientList) {
    var newClientList;
    var index = -1;
    for (var i = 0; i < clientList.length; i++) {
        if (priority == clientList[i].priority()) {
            for (j = i; j < clientList.length; j++) {
                x = Number(clientList[j].priority()) + 1;
                clientList[j].priority(String(x));
            }
            break;
        }
    }
    return clientList;
}

var view_model = new viewModel();
ko.applyBindings(view_model);
// ko.applyBindings(new viewModel());