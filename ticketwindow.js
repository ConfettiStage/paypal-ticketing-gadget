

var ShowOptions = React.createClass({
  render: function () {
    var options = [];
    this.props.data.forEach( function (show) {
      show.times.forEach( function (time) {
        options.push(<option value={show.name+" @ "+time}>{show.name} @ {time}</option>);
      });
    });
    return (
      <div>
      <input type="hidden" name="on1" value="Show and Time"/>
      <select name="os1">
        { options }
      </select>
      </div>
    );
  }
});

var TypeOptions = React.createClass({
  render: function () {
    var options = [];
    options.push(<option value="Standard Ticket">General Admission $15.00</option>);
    options.push(<option value="Student Ticket">Student Admission $10.00</option>);
    options.push(<option value="FlexTix">FlexTix (5 Tickets) $50.00</option>)
    return (<div>
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
    return (<div><ShowOptions data={this.props.data} /><TypeOptions /></div>);
  }
});

React.render(
  <TicketWindow data={showData} />,
  document.getElementById('ticketOptions')
);