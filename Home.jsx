import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [close,setClose]=useState(true);
    const show = () => {
      setIsVisible(!isVisible);
    };
    
  return (
    <div>
        <nav id="navbar">
        <div className="logo">
          <img src="./logo.png" alt="" id="logo" />
          <h1 id="name">Scripture Union</h1>
        </div>
        <button className="menu-toggle" onClick={show}> ☰</button>
        
          <ul id="list">
            <li><Link to={'/Volunteer'} style={{textDecoration:'none',color:'inherit'}}>Volunteer</Link></li>
            <li>Lorem ipm</li>
            <li>
              <Link to={'/Event Scheduling'} style={{textDecoration:'none',color:'inherit'}}>Event Scheduling</Link>
            </li>
            <li>Lorem, ipsum.</li>
          </ul>
    
        <button className="logBtn">
          <Link to={'/Login'} style={{textDecoration:'none',color:'inherit'}}>Logout</Link>
        </button>
      </nav>
      <div className="sideBar" style={{ display: isVisible ? "flex" : "none" }}>
    <ul id="list">
            <h1 id="close" onClick={show}>X</h1>
            <li><Link to={'/Volunteer'} style={{textDecoration:'none',color:'inherit'}}>Volunteer</Link></li>
            <li>Lorem ipm</li>
            <li>
              <Link to={'/Event Scheduling'} style={{textDecoration:'none',color:'inherit'}}>Event Scheduling</Link>
            </li>
            <li>Lorem, ipsum.</li>
          </ul>
    
        <button className="logBtnSideBar">
          <Link to={'/Login'} style={{textDecoration:'none',color:'inherit'}}>Logout</Link> </button>
    </div>
     <div className="info">
        <div id="info">
            <h1 id="hed1">Welcome to VolunteerHub</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, deserunt nobis! Accusantium incidunt unde natus fugiat. Animi quae ipsam libero odio reiciendis quaerat quasi atque consequuntur eligendi officiis obcaecati maiores harum, inventore velit explicabo magni? Repellat, nulla ratione non eius odit adipisci alias ullam neque iusto unde est blanditiis iure dolorum nihil error nesciunt delectus, laudantium quasi! Culpa non praesentium voluptatibus nobis ea. Quae, atque harum qui ipsam sed vero sint aspernatur natus, ipsum eos sunt corporis tenetur vel mollitia quam quidem adipisci id porro fugit itaque accusamus incidunt repudiandae amet blanditiis. Voluptates doloremque laborum enim nobis eos laudantium doloribus repellendus expedita, nesciunt est impedit ullam corporis quibusdam ad at, neque nulla necessitatibus saepe ea provident labore et rerum alias!</p>
        </div>
        <div className="img">
            <img id="img" src="https://readytrainingonline.com/wp-content/uploads/2021/11/11-16-21-Community-Service.jpg" alt="" />
        </div>
    </div>
  
            <div className="box">
            <div className="firstHeading">
                <h1 id="hed">Heading1</h1>
                <p id="para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ut voluptate at totam ad ea magni, inventore non quibusdam suscipit iure velit soluta, nostrum similique obcaecati esse ducimus aperiam consequuntur sit consequatur natus. Perspiciatis eos in necessitatibus. Animi, facilis incidunt.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur totam doloribus dolorem quisquam commodi aliquam id consequuntur unde animi earum nisi autem sint repudiandae laborum, obcaecati doloremque. Quos tempora deserunt nihil reprehenderit laborum quibusdam minus numquam quae inventore excepturi?
                </p>
                <button id="naviBtn"><Link to={'/Volunteer'} style={{textDecoration:'none',color:'inherit'}}>Volunteer</Link></button>
            </div>

            <div className="secondHeading">
                <h1 id="hed">Heading 2</h1>
                <p id="para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, nobis. Minima quaerat asperiores veniam ad saepe tenetur neque eos dolor unde totam praesentium voluptates aperiam recusandae ullam consectetur dolorum reprehenderit, facere enim perferendis repellat voluptatem voluptate! Amet exercitationem similique doloremque excepturi doloribus reiciendis vel possimus delectus a facere, enim dignissimos omnis nam nemo? Explicabo asperiores placeat molestiae corrupti voluptates. Aliquam voluptatum sint ex vero magni asperiores iure consequuntur in enim. Beatae consectetur, porro qui aliquid totam vero magni dolor enim?</p>
                <button id="naviBtn">Lorem ipm</button>
            </div>
           
       
            <div className="thirdHeading">
                <h1 id="hed">Heading 3</h1>
                <p id="para">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis vitae, ea, magni dolorum maiores cum deserunt laborum ipsam quo adipisci asperiores praesentium voluptatem neque odit porro! Rerum impedit perferendis a ipsam earum necessitatibus provident quidem, enim nesciunt ratione. Est repudiandae, consequatur, voluptas sed earum ipsa vel minus omnis magnam culpa nam fugit neque illo soluta dolore beatae totam. Inventore totam magni placeat nisi in praesentium neque aperiam doloribus incidunt distinctio, cum molestiae mollitia. Voluptatem voluptatum, perspiciatis neque optio commodi illo.</p>
                <button id="naviBtn"><Link to={'/Event-Scheduling'} style={{textDecoration:'none',color: "inherit"}}>Event Scehduling</Link>
                </button>
            </div>

            <div className="fourthHeading">
                <h1 id="hed">Heading 4</h1>
                <p id="para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit et tempora odit consequatur tenetur a quos nobis, in omnis voluptate culpa cupiditate adipisci ullam dolor sapiente eius velit, autem atque soluta iusto. Distinctio quos, dolorem dignissimos quis corrupti sunt assumenda illum, cupiditate ipsam laborum, id illo. Eveniet eius impedit esse harum autem natus nobis sequi obcaecati explicabo quisquam, a voluptates repellat dicta suscipit iusto deserunt facilis cumque numquam assumenda qui! Optio facere dicta tempore sit quasi, ut exercitationem hic! Hic!</p>
                <button id="naviBtn">Lorem, ipsum.</button>
            </div>
            </div> 
      
    </div>

  );
}

export default Home;
