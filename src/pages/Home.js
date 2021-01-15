export default function Home() {
  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">This is meant as startcode</h2>
          <h4>How to use it:</h4>
          <p>
            Open your project folder in a terminal or git bash and install the
            following node modules with these commands:
            <li>npm install bootstrap</li>
            <li>npm install jwt-token</li>
            <li>npm install react-router-dom</li>
          </p>
          <p>
            IMPORTANT!
            <li>Util folder contains settings.js CHANGE THE URL to your own</li>
          </p>
          <p>
            The structure: 
            <li>components folder: contains all components for the project</li>
            <li>pages folder: holds contains "pages" rendered</li>
            <li>api folder: holds contains facades used to fetch data</li>
          </p>
          <p>
            Your time to shine
            <li>Change the home component to render something else than this</li>
            <li>Add components to the components if you need more</li>
            <li>Fecth data from the api folders facades</li>
            <li>Implement the changes on the desired "page" and add the component to App.js</li>
          </p>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
