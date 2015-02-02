var Show = React.createClass({displayName: "Show",
  getInitialState: function () {
    var showData = this.props.data[0];
    this.setState({
      show: showData.name,
      paypal: showData.paypal,
      dates: showData.dates,
      tickets: showData.tickets
    });
  },
  changeShow: function(evt) {
    var showData;
    this.props.data.forEach(function (show) {
      if (evt.target.value === show.name) {
        showData = show;
      }
    });
    this.setState({
      show: showData.name,
      paypal: showData.paypal,
      dates: showData.dates,
      tickets: showData.tickets
    });
  },
  render: function () {
    var options = [];
    if (this.props.data) {
      this.props.data.forEach( function (show, object) {
        options.push(React.createElement("option", {value: show}, show))
      });  
    }
    
    return (
      React.createElement("div", null, 
        React.createElement("div", null, 
          React.createElement("select", {onChange: this.changeShow}, 
            options 
          )
        ), 
        React.createElement("div", null, 
          React.createElement("input", {type: "hidden", name: "hosted_button_id", value: "{this.state.paypal}"}), 
          React.createElement(Dates, null), 
          React.createElement(Type, null)
        )
      )
    );
  }
});

var Dates = React.createClass({displayName: "Dates",
  render: function () {
    var options = [];
    if (this.state.dates) {
      this.state.dates.forEach( function (date) {
        options.push(React.createElement("option", {value: date}, date));
      });  
    }
    
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "hidden", name: "on1", value: "Time"}), 
        React.createElement("select", {name: "os1"}, 
          options 
        )
      )
    );
  }
});

var Type = React.createClass({displayName: "Type",
  render: function () {
    var options = [];
    if (this.state.tickets) {
      this.state.tickets.forEach( function (ticket) {
        options.push(React.createElement("option", {value: ticket.type}, ticket.desc));
      });  
    }
    
    options.push(React.createElement("option", {value: "FlexTix"}, "FlexTix (4 tickets) $50.00"));
    return (
      React.createElement("div", null, 
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
    return (
      React.createElement("form", {xmlns: "http://www.w3.org/1999/xhtml", action: "https://www.paypal.com/cgi-bin/webscr", method: "post", target: "paypal"}, 
        React.createElement("input", {type: "hidden", name: "cmd", value: "_s-xclick"}), 
        React.createElement("input", {name: "currency_code", type: "hidden", value: "USD"}), 
        React.createElement(Show, {data: this.props.data}), 
        React.createElement("div", null, 
          React.createElement("input", {alt: "PayPal - The safer, easier way to pay online!", border: "0", name: "submit", src: "https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif", type: "image"})
        )
      )
    );
  }
});

React.render(
  React.createElement(TicketWindow, {data: showData}),
  document.getElementById('ticketWindow')
);
