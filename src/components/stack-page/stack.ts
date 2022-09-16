import { type } from "os";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { IStack } from "./types";

export default class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    console.log(this.container);
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  clearContainer = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
}
