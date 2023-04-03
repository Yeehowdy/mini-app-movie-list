/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {title: "Kung Fury"},
    {title: "Nacho Libre"},
    {title: "Pulp Fiction"},
    {title: "Idiocracy"},
    {title: "Dark Tower"},
    {title: "WALL-E"},
    {title: "Alien"},
    {title: "Sharknado"},
    {title: "Coco"},
    {title: "Soul"},
    {title: "Baby Driver"},
    {title: "Raiders of the Lost Ark"},
  ]);
};
