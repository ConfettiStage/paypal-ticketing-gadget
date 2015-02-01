var ShowOptions = React.createClass({displayName: "ShowOptions",
  render: function () {
    var options = [];
    this.props.data.forEach( function (show) {
      show.times.forEach( function (time) {
        options.push(React.createElement("option", {value: show.name+" @ "+time}, show.name, " @ ", time));
      });
    });
    return (
      React.createElement("div", null, 
      React.createElement("input", {type: "hidden", name: "on1", value: "Show and Time"}), 
      React.createElement("select", {name: "os1"}, 
        options 
      )
      )
    );
  }
});

var TypeOptions = React.createClass({displayName: "TypeOptions",
  render: function () {
    var options = [];
    options.push(React.createElement("option", {value: "Standard Ticket"}, "General Admission $15.00"));
    options.push(React.createElement("option", {value: "Student Ticket"}, "Student Admission $10.00"));
    options.push(React.createElement("option", {value: "FlexTix"}, "FlexTix (5 Tickets) $50.00"))
    return (React.createElement("div", null, 
      React.createElement("input", {type: "hidden", name: "on0", value: "Ticket Type"}), 
      React.createElement("select", {name: "os0"}, 
        options 
      )
      )
    );
  }
});

var TicketWindow = React.createClass({displayName: "TicketWindow",
  render: function () {
    return (React.createElement("div", null, React.createElement(ShowOptions, {data: this.props.data}), React.createElement(TypeOptions, null)));
  }
});

React.render(
  React.createElement(TicketWindow, {data: showData}),
  document.getElementById('ticketOptions')
);
