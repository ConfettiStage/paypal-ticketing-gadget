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
          <input type="hidden" name="hosted_button_id" value="{this.state.paypal}"/>
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
    console.log(this.props.tickets);
    return (
      <div>
        <input type="hidden" name="on0" value="Ticket Type"/>
        <select name="os0">
        <option>-choose a ticket type-</option>
        {this.props.tickets.map( function (ticket) {
          return <option key={ticket[1]} value={ticket.type}>{ticket.desc}</option>;
        })}
        <option value="FlexTix">FlexTix (4 tickets) $50.00</option>
        </select>
      </div>
    );
  }
});

var TicketWindow = React.createClass({
  render: function () {
    return (
        <Show data={this.props.data}/>
    );
  }
});

React.render(
  <TicketWindow data={showData} />,
  document.getElementById('ticketWindow')
);
