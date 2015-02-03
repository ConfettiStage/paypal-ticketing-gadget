var Show = React.createClass({displayName: "Show",
  getInitialState: function () {
    return {
      show: "-choose a show-",
      paypal: '',
      dates: [],
      tickets: []
    };
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
    var options = [React.createElement("option", null, "-choose show-")];
    this.props.data.forEach( function (show) {
      options.push(React.createElement("option", {key: show.name, value: show.name}, show.name))
    });  
    
    return (
      React.createElement("div", null, 
        React.createElement("div", null, 
          React.createElement("select", {onChange: this.changeShow}, 
            React.createElement("option", null, "-choose show-"), 
            this.props.data.map( function (show) {
              return React.createElement("option", {key: show.name, value: show.name}, show.name)
            })
          )
        ), 
        React.createElement("div", null, 
          React.createElement("input", {type: "hidden", name: "hosted_button_id", value: "{this.state.paypal}"}), 
          React.createElement(DateSelect, {dates: this.state.dates}), 
          React.createElement(TicketSelect, {tickets: this.state.tickets})
        )
      )
    );
  }
});

var DateSelect = React.createClass({displayName: "DateSelect",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "hidden", name: "on1", value: "Time"}), 
        React.createElement("select", {name: "os1"}, 
        React.createElement("option", null, "-choose a time"), 
        this.props.dates.map( function (date) {
          return React.createElement("option", {key: date, value: date}, date);
        })
        )
      )
    );
  }
});

var TicketSelect = React.createClass({displayName: "TicketSelect",
  render: function () {
    console.log(this.props.tickets);
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "hidden", name: "on0", value: "Ticket Type"}), 
        React.createElement("select", {name: "os0"}, 
        React.createElement("option", null, "-choose a ticket type-"), 
        this.props.tickets.map( function (ticket) {
          return React.createElement("option", {key: ticket.type, value: ticket.type}, ticket.desc);
        }), 
        React.createElement("option", {value: "FlexTix"}, "FlexTix (4 tickets) $50.00")
        )
      )
    );
  }
});

React.render(
      React.createElement("form", {xmlns: "http://www.w3.org/1999/xhtml", action: "https://www.paypal.com/cgi-bin/webscr", method: "post", target: "paypal"}, 
        React.createElement("input", {type: "hidden", name: "cmd", value: "_s-xclick"}), 
        React.createElement("input", {name: "currency_code", type: "hidden", value: "USD"}), 
        React.createElement(Show, {data: showData}), 
        React.createElement("input", {alt: "PayPal - The safer, easier way to pay online!", border: "0", name: "submit", src: "https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif", type: "image"})
      ),
  document.getElementById('ticketWindow')
);
