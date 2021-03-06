import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import Checkbox from 'material-ui/lib/checkbox';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import AuthPanel from "./AuthPanel";
import AddCard from "./AddCard";

export default class Navbar extends React.Component {

  handleCategory(event, index, value) {
    this.props.categorySelect(value);
  }

  // YES, this setTimeout looks janky but it was the only way I found that displays the checked boxes after selecting them
  handleToggle(e) {
    const toggleFilter = e.target.value;
    window.setTimeout(
      function(){
      this.props.stateToggle(toggleFilter)}.bind(this),
      0
    );
  }

  handleShowAdd() {
    this.props.stateToggle('showAdd');
  }

  handleShowFavs() {
    this.props.stateToggle('showMyFavs')
    this.props.getUserFavs()
  }

  // getFavs() {
  //   var that = this;
  //   fetch('http://localhost:4000/myfavs', {
  //     method: 'GET',
  //     headers: {  
  //          //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
  //         'Accept': 'application/json',
  //        },
  //     body: {userID: 2}     
  //   })
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(json) {
  //     console.log('got this json', json);
  //     that.setState({cardData: json})
  //   })
  //   .catch(function(err) {
  //     console.log('something went wrong getting data', err);
  //   });

  // }

  // showFavs() {
  //   this.props.getFavs();
  // }

  render () {
    //console.log('navbar props',this.props)
    const styles = {
      title: {
        color: "red",
        minWidth: 160,
        maxWidth: 160,
        fontWeight: 700, 
        fontSize: "30px",
        marginRight: 0,
        // background: "blue",
      },
      dropdown: {
        marginRight: 100,
        width: 30,
        // background: "blue",
      },
      toolbar: {
        color: "black",
      },
      checkbox: {
        maxWidth: 150,
        marginTop: 16,
        paddingLeft: 10,
      },
      button: {
        margin: 12
      }
    };

    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle style={styles.title} text="YumSnap!" float="left" />
          
          <ToolbarGroup float="right">
            <AuthPanel 
              authToggle={this.props.authToggle.bind(this)}
              auth={this.props.auth}
              yummy={this.props.yummy}
              getFBToken={this.props.getFBToken.bind(this)}
            />
          </ToolbarGroup>
        </Toolbar>
        <Toolbar style={{
          background: '#fff',
          border: '1px solid #ccc'
        }}>
          <RaisedButton 
            primary={true} 
            onClick={this.handleShowAdd.bind(this)} 
            label={!this.props.showAdd ? "ADD DISH" : "CANCEL"} 
            default={true} style={styles.button} 
            disabled={!this.props.yummy}
            float="left"
          />  

          <RaisedButton 
            primary={true} 
            onClick={this.handleShowFavs.bind(this)} 
            label={this.props.showMyFavs ? "Home Feed" : "My Favorites"} 
            default={true} style={styles.button} 
            disabled={!this.props.yummy}
            float="left"
          />  
          
          <ToolbarGroup style={{ 
              float       : 'none', 
              width       : '600px',
              marginLeft  : 'auto',
              marginRight : 'auto'
          }}>
            <DropDownMenu style={styles.dropdown} value={this.props.category} onChange={this.handleCategory.bind(this)}>
                <MenuItem value={null} primaryText="All"/>
                <MenuItem value={1} primaryText="Mexican"/>
                <MenuItem value={2} primaryText="American"/>
                <MenuItem value={3} primaryText="Asian"/>
                <MenuItem value={4} primaryText="Italian"/>
                <MenuItem value={5} primaryText="BBQ"/>
            </DropDownMenu>
            <Checkbox
              value="veg"
              onClick={this.handleToggle.bind(this)}
              label="Vegetarian"
              style={styles.checkbox}
            />
            <Checkbox
              value="gf"
              label="Gluten-free"
              onClick={this.handleToggle.bind(this)}
              style={styles.checkbox}
            />
            <Checkbox
              value="noSpice"
              label="Not-Spicy"
              onClick={this.handleToggle.bind(this)}
              style={styles.checkbox}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>

    )
  }
}
/*
          In case we want to filter by favorites later:

          <Checkbox
            value="showFavs"
            onClick={this.handleToggle.bind(this)}
            checkedIcon={<ActionFavorite/>}
            uncheckedIcon={<ActionFavoriteBorder/>}
            label="Favorites"
            style={styles.checkbox}
          />
*/
