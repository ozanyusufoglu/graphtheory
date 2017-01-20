// data in JSON format from Kron

var elements = {
"nodes":	[{
    "data":	{
      "id":	"org.pipeline.4",
      "name":	"org.pipeline.4",
      "bitrate" : "5000"
    }
  }, {
    "data":	{
      "id":	"connect-server-127.0.0.1-40001",
      "name":	"connect",
      "parent":	"org.pipeline.4",
      "bitrate" : "1000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.4-pcap-out-1",
      "name":	"pcap-out",
      "parent":	"org.pipeline.4",
      "bitrate" : "2000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1",
      "name":	"org.pipeline.1",
      "bitrate" : "3000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-pcap-in-0",
      "name":	"pcap-in",
      "parent":	"org.pipeline.1",
      "bitrate" : "4000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-connect-client-127.0.0.1-20001",
      "name":	"connect",
      "parent":	"org.pipeline.1",
      "bitrate" : "5000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-connect-client-127.0.0.1-30001",
      "name":	"connect",
      "parent":	"org.pipeline.1",
      "bitrate" : "6000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.2",
      "name":	"org.pipeline.2",
      "bitrate" : "7000"
    }
  }, {
    "data":	{
      "id":	"connect-server-127.0.0.1-20001",
      "name":	"connect",
      "parent":	"org.pipeline.2",
      "bitrate" : "8000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.2-packet-filter-1",
      "name":	"packet-filter",
      "parent":	"org.pipeline.2",
      "bitrate" : "9000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.2-connect-client-127.0.0.1-40001",
      "name":	"connect",
      "parent":	"org.pipeline.2",
      "bitrate" : "10000"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.3",
      "name":	"org.pipeline.3",
      "bitrate" : "11000"
    }
  }, {
    "data":	{
      "id":	"connect-server-127.0.0.1-30001",
      "name":	"connect",
      "parent":	"org.pipeline.3",
      "bitrate" : "11000"

    }
  }, {
    "data":	{
      "id":	"org.pipeline.3-packet-filter-1",
      "name":	"packet-filter",
      "parent":	"org.pipeline.3",
      "bitrate" : "11000"

    }
  }, {
    "data":	{
      "id":	"org.pipeline.3-connect-client-127.0.0.1-40001",
      "name":	"connect",
      "parent":	"org.pipeline.3",
      "bitrate" : "11000"

    }
  }],
"edges":	[{
    "data":	{
      "id":	"connect-server-127.0.0.1-40001-org.pipeline.4-pcap-out-1",
      "source":	"connect-server-127.0.0.1-40001",
      "target":	"org.pipeline.4-pcap-out-1"
    }
  }, {
    "data":	{
      "id":	"org.pipefline.1-pcap-in-0-org.pipeline.1-connect-client-127.0.0.1-20001",
      "source":	"org.pipeline.1-pcap-in-0",
      "target":	"org.pipeline.1-connect-client-127.0.0.1-20001"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-connect-client-127.0.0.1-20001-connect-server-127.0.0.1-20001",
      "source":	"org.pipeline.1-connect-client-127.0.0.1-20001",
      "target":	"connect-server-127.0.0.1-20001"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-connect-client-127.0.0.1-20001-org.pipeline.1-connect-client-127.0.0.1-30001",
      "source":	"org.pipeline.1-connect-client-127.0.0.1-20001",
      "target":	"org.pipeline.1-connect-client-127.0.0.1-30001"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.1-connect-client-127.0.0.1-30001-connect-server-127.0.0.1-30001",
      "source":	"org.pipeline.1-connect-client-127.0.0.1-30001",
      "target":	"connect-server-127.0.0.1-30001"
    }
  }, {
    "data":	{
      "id":	"connect-server-127.0.0.1-20001-org.pipeline.2-packet-filter-1",
      "source":	"connect-server-127.0.0.1-20001",
      "target":	"org.pipeline.2-packet-filter-1"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.2-packet-filter-1-org.pipeline.2-connect-client-127.0.0.1-40001",
      "source":	"org.pipeline.2-packet-filter-1",
      "target":	"org.pipeline.2-connect-client-127.0.0.1-40001"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.2-connect-client-127.0.0.1-40001-connect-server-127.0.0.1-40001",
      "source":	"org.pipeline.2-connect-client-127.0.0.1-40001",
      "target":	"connect-server-127.0.0.1-40001"
    }
  }, {
    "data":	{
      "id":	"connect-server-127.0.0.1-30001-org.pipeline.3-packet-filter-1",
      "source":	"connect-server-127.0.0.1-30001",
      "target":	"org.pipeline.3-packet-filter-1"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.3-packet-filter-1-org.pipeline.3-connect-client-127.0.0.1-40001",
      "source":	"org.pipeline.3-packet-filter-1",
      "target":	"org.pipeline.3-connect-client-127.0.0.1-40001"
    }
  }, {
    "data":	{
      "id":	"org.pipeline.3-connect-client-127.0.0.1-40001-connect-server-127.0.0.1-40001",
      "source":	"org.pipeline.3-connect-client-127.0.0.1-40001",
      "target":	"connect-server-127.0.0.1-40001"
    }
  }]
};
