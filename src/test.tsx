import {JSXFactory} from './jsx_renderer';
import testImage from '../public/assets/test_img.PNG';

const text = "It Works!";

document.getElementById("app")?.appendChild(
    <div>
        <h1 id="textid">{text}</h1>
        <img src={testImage}/>
    </div>
);