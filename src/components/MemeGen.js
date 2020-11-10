import React from 'react';

class MemeGen extends React.Component {

    state = {
        topText: "",
        bottomText: "",
        randomImg: 'http://i.imgflip.com/1bij.jpg',
        allMemeImgs: []
    }

    componentDidMount() { //ensure that data is fetched at the beginning
        fetch("https://api.imgflip.com/get_memes") //call to URL
            .then(response => response.json()) //turn promise into JS object
            .then(response => {
        const { memes } = response.data //pull memes array from response.data
        // console.log(memes[0]) check data is present
        this.setState({ allMemeImgs: memes }) // set allMemeImgs state
    })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleClick = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input type="text"
                    placeholder="Enter Top text"
                    name="topText"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <input type="text"
                    placeholder="Enter Bottom text"
                    name="bottomText"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    />
                    <button id="gen" onClick={this.handleClick}>Generate</button>
                </form>
                <div className="meme">
                    <img className="meme-img" src={this.state.randomImg} alt="#" width="500" height="300"/>
                    <h2 id="topText">{this.state.topText}</h2>
                    <h2 id="bottomText">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGen;