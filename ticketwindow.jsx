var Show = React.createClass({
  changeShow: function(evt) {
    var showData = this.props.data[this.state.show];
    this.setState({
      show: evt.target.value,
      paypal: showData.paypal,
      dates: showData.dates,
      tickets: showData.tickets
    });
  },
  render: function () {
    var options = [];
    if (this.props.data) {
      this.props.data.forEach( function (show, object) {
        options.push(<option value={show}>{show}</option>)
      });  
    }
    
    return (
      <div>
        <div>
          <select onChange={this.changeShow}>
            { options }
          </select>
        </div>
        <div>
          <input type="hidden" name="hosted_button_id" value="{this.state.paypal}"/>
          <Dates />
          <Type />
        </div>
      </div>
    );
  }
});

var Dates = React.createClass({
  render: function () {
    var options = [];
    if (this.state.dates) {
      this.state.dates.forEach( function (date) {
        options.push(<option value={date}>{date}</option>);
      });  
    }
    
    return (
      <div>
        <input type="hidden" name="on1" value="Time"/>
        <select name="os1">
          { options }
        </select>
      </div>
    );
  }
});

var Type = React.createClass({
  render: function () {
    var options = [];
    if (this.state.tickets) {
      this.state.tickets.forEach( function (ticket) {
        options.push(<option value={ticket.type}>{ticket.desc}</option>);
      });  
    }
    
    options.push(<option value="FlexTix">FlexTix (4 tickets) $50.00</option>);
    return (
      <div>
        <input type="hidden" name="on0" value="Ticket Type"/>
        <select name="os0">
          { options }
        </select>
      </div>
    );
  }
});

var TicketWindow = React.createClass({
  render: function () {
    return (
      <form xmlns="http://www.w3.org/1999/xhtml" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="paypal">
        <input type="hidden" name="cmd" value="_s-xclick"/>
        <input name="currency_code" type="hidden" value="USD" />
        <Show data={this.props.data}/>
        <div>  
          <input alt="PayPal - The safer, easier way to pay online!" border="0" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" type="image" />
        </div>
      </form>
    );
  }
});

React.render(
  <TicketWindow data={showData} />,
  document.getElementById('ticketWindow')
);
