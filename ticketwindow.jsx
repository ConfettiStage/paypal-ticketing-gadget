var Show = React.createClass({
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
    var options = [<option>-choose show-</option>];
    this.props.data.forEach( function (show) {
      options.push(<option key={show.name} value={show.name}>{show.name}</option>)
    });

    return (
      <div>
        <div>
          <select onChange={this.changeShow}>
            <option>-choose show-</option>
            {this.props.data.map( function (show) {
              return <option key={show.name} value={show.name}>{show.name}</option>
            })}
          </select>
        </div>
        <div>
          <input type="hidden" name="hosted_button_id" value={this.state.paypal}/>
          <DateSelect dates={this.state.dates}/>
          <TicketSelect tickets={this.state.tickets}/>
        </div>
      </div>
    );
  }
});

var DateSelect = React.createClass({
  render: function () {
    return (
      <div>
        <input type="hidden" name="on1" value="Time"/>
        <select name="os1">
        <option>-choose a time</option>
        {this.props.dates.map( function (date) {
          return <option key={date} value={date}>{date}</option>;
        })}
        </select>
      </div>
    );
  }
});

var TicketSelect = React.createClass({
  render: function () {
    return (
      <div>
        <input type="hidden" name="on0" value="Ticket Type"/>
        <select name="os0">
        <option>-choose a ticket type-</option>
        {this.props.tickets.map( function (ticket) {
          return <option key={ticket.type} value={ticket.type}>{ticket.desc}</option>;
        })}
        </select>
      </div>
    );
  }
});

React.render(
      <form xmlns="http://www.w3.org/1999/xhtml" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="paypal">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input name="currency_code" type="hidden" value="USD" />
        <Show data={showData}/>
        <input alt="PayPal - The safer, easier way to pay online!" border="0" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" type="image" />
        <p style={{color:'white'}}>
          The receipt from PayPal will be your ticket. Please print it out and bring it to the performance.
        </p>
      </form>,
  document.getElementById('ticketWindow')
);
