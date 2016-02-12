import Ember from 'ember';

const protocolOptions = [
  {label: 'TCP', value: 'TCP'},
  {label: 'UDP', value: 'UDP'}
];

export default Ember.Component.extend({
  // Inputs

  // The initial ports to show, as an array of objects
  initialPorts: null,

  errors: null,
  editing: false,

  tagName: 'div',
  classNames: ['row','form-group'],
  portsArray: null,
  protocolOptions: protocolOptions,

  didInitAttrs() {
    var out = [];

    var ports = this.get('initialPorts')||[];
    out = JSON.parse(JSON.stringify(ports));

    this.set('portsArray', out);
    if ( !out.length )
    {
      this.send('addPort');
    }

    this.portsArrayDidChange();
  },

  actions: {
    addPort: function() {
      this.get('portsArray').pushObject({
        name: '',
        protocol: 'TCP',
        port: '',
        targetPort: '',
        nodePort: ''
      });
    },

    removePort: function(obj) {
      this.get('portsArray').removeObject(obj);
    },
  },

  portsArrayDidChange: function() {
    var out = this.get('portsArray').map((row) => {
      var obj = {
        port: parseInt(row.port,10) || 0,
        protocol: row.protocol,
      };

      if ( row.name ) {
        obj.name = row.name;
      }

      if ( row.targetPort ) {
        obj.targetPort = parseInt(row.targetPort,10);
      }

      return obj;
    }).filter((obj) => {
      return obj.port > 0;
    });

    this.sendAction('changed', out);
  }.observes('portsArray.@each.{name,protocol,port,targetPort,nodePort}'),
});