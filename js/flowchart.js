// flowchart.js
document.addEventListener("DOMContentLoaded", function () {
    // Define a simple function to create the node template
    function makeNodeTemplate(text) {
      return $(go.Node, "Auto",
        { background: "white" },
        $(go.Shape, "RoundedRectangle", { fill: "lightblue", stroke: "gray" }),
        $(go.TextBlock, text ? text : "Node", { margin: 8 })
      );
    }
  
    // Create the GoJS diagram
    const diagram = $(go.Diagram, "myDiagramDiv", { initialContentAlignment: go.Spot.Center });
  
    // Add nodes to represent the process flow
    diagram.nodeTemplateMap.add("Server", makeNodeTemplate("Server"));
    diagram.nodeTemplateMap.add("ESP", makeNodeTemplate("ESP"));
    diagram.nodeTemplateMap.add("ActualLED", makeNodeTemplate("Actual LED"));
    diagram.nodeTemplateMap.add("ColorSensor", makeNodeTemplate("Color Sensor"));
    diagram.nodeTemplateMap.add("DetectedLED", makeNodeTemplate("Detected LED"));
  
    // Define the links between nodes
    diagram.linkTemplate = $(go.Link,
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );
  
    // Define the nodes and links in the diagram
    diagram.model = $(go.GraphLinksModel,
      {
        nodeDataArray: [
          { key: "Server", category: "Server" },
          { key: "ESP", category: "ESP" },
          { key: "ActualLED", category: "ActualLED" },
          { key: "ColorSensor", category: "ColorSensor" },
          { key: "DetectedLED", category: "DetectedLED" }
        ],
        linkDataArray: [
          { from: "Server", to: "ESP" },
          { from: "ESP", to: "ActualLED" },
          { from: "ActualLED", to: "ColorSensor" },
          { from: "ColorSensor", to: "ESP" },
          { from: "ESP", to: "DetectedLED" }
        ]
      });
  });
  