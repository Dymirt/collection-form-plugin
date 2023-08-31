import App from "./App";
import { render } from '@wordpress/element';
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';

// Render the App component into the DOM
render(<App />, document.getElementById('collection-form'));