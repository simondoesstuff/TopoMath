import Grapick from "grapick/src/Grapick";
import React from "react";

/**
 * React wrapper for the Grapick library
 *
 * **grapickRef**
 * Used to maintain and access the Grapick object state
 * - prop is required to maintain the Grapick
 * object state between mounts. It will reference the
 * current Grapick object after the component mounts.
 *
 * **defaultHandlers**
 * Default handlers when none are inherited.
 * - {position: number, color: string}[]
 * will be used to create default handlers in a new Grapick
 * object in the case that the grapickRef is null.
 */
export default class GrapickBar extends React.Component {
    constructor(props) {
        super(props);

        // relevant props:      ref, grapickRef, defaultHandlers

        this.elRef = props.ref;
        this.gpRef = props.grapickRef;

        this.elRef = this.elRef ?? React.createRef();
        this.gpRef = this.gpRef ?? React.createRef();
    }

    componentDidMount() {
        this.initGP();
    };

    loadHandlers = () => {
        let handlers = [];

        if (this.gpRef.current) {
            handlers = this.gpRef.current.getHandlers() || [];
        } else if (this.props.defaultHandlers) {
            handlers = this.props.defaultHandlers.map(e => ({
                getPosition: () => e.position,
                getColor: () => e.color
            }))
        }

        return handlers;
    }

    initGP = () => {
        if (!this.elRef.current) return;

        const newGP = new Grapick({el: this.elRef.current});
        let handlers = this.loadHandlers();

        for (let handler of handlers) {
            newGP.addHandler(handler.getPosition(), handler.getColor());
        }

        this.destroyGP();   // destroy the old GP
        this.gpRef.current = newGP;
    }

    destroyGP = () => {
        this.gpRef.current?.destroy();
    }

    render = () => {
        return (
            <div ref={this.elRef}/>
        )
    }
}