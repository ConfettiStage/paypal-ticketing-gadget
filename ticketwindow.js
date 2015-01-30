function() {

 showData = [
    {
      name: "Waiting for Godot",
      studentDiscount: true,
      times: [
        "Friday 730",
        "Saturday"
      ]
    },
    {
      name: "Water by the Spoonful",
      times: [
        "Friday",
        "Saturday"
      ]
    }
  ];
  var ShowsOptions = React.createClass({
    render: function () {
      var options = [];
      this.props.data.forEach( function (show) {
        show.times.forEach( function (time) {
          options.push(<option value="{show.name} @ {time}">{show.name} @ {time}</option>);
        });
      });
      return (
        <input type="hidden" name="on1" value="Ticket Type">
        <select name="os1">
          { options }
        </select>);
    }
  });
  var TypeOptions = React.createClass({
    render: function () {
      var options = [];
      options.push(<option value="Standard Ticket">General Admission $15.00</option>);
      options.push(<option value="Student Ticket">Student Admission $10.00</option>);
      options.push(<option value="FlexTix">FlexTix (5 Tickets) $50.00</option>)
      return (
        <input type="hidden" name="on0" value="Ticket Type">
        <select name="os0">
          { options }
        </select>);
    }
  });
  var TicketWindow = React.createClass({
    render: function () {
      return (<Options data={this.props.data} />
      <TypeOptions />);
    }
  });
  
  React.render(
    <TicketWindow data={showData} />,
    document.getElementById('ticketOptions')
  );
}();