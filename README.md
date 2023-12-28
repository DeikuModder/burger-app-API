# burger-app-API

Hello! This is the **v1 of a public API that shows information of a data base of burgers**, as it's name says.

The data of this burgers **are not of real business**, it's intended to be for practice use, (like Pokeapi, WeatherApi, etc), **for you to use on your personal projects!**

# Base URL

`https://burger-app-api-seven.vercel.app/`

# Endpoints

At the moment you only have two endpoints:

## `api/v1/burgers`

To retrieve all burgers in DB, exmaple: 

```json
[{
    "combos": {
        "1": {
            "content": ["1_Cheese_Burger", "French_Fries", "Pepsi_250ml"],
            "price": 8.5
        },
        "content": []
    },
    "_id": "656e554cbef7de3e6f9ea6bb",
    "name": "Cheese_Burger",
    "ingredients": ["Meat", "Cheddar_Cheese", "Lettuce", "Tomato_Sauce"],
    "price": 5.99
}, {
    "combos": {
        "1": {
            "content": ["1_Chicken_Burger", "French_Fries", "Pepsi_250ml"],
            "price": 10
        },
        "2": {
            "content": ["2 Chicken Burger", "Pepsi 500ml"],
            "price": 12.99
        },
        "content": []
    },
    "_id": "656e554cbef7de3e6f9ea6bc",
    "name": "Chicken_Burger",
    "ingredients": ["Fried_Chicken", "Lettuce", "Tomatoes", "Tomato_Sauce", "Mayonnaise", "Mustard"],
    "price": 7.99
}]
```

## `api/v1/burgers?name="burger_name"` 

To retrieve a one burger by it's name:

burger_name: `Cheese_Burger`

```json
[{
    "combos": {
        "1": {
            "content": ["1_Cheese_Burger", "French_Fries", "Pepsi_250ml"],
            "price": 8.5
        },
        "content": []
    },
    "_id": "656e554cbef7de3e6f9ea6bb",
    "name": "Cheese_Burger",
    "ingredients": ["Meat", "Cheddar_Cheese", "Lettuce", "Tomato_Sauce"],
    "price": 5.99
}]
```

## `api/v1/burgers/:id`

Retrieve one burger by it's `_id`:

## Techs

- NodeJs
- Express Js
- TypeScript
- Mongoose

## Note

If an error or a bug happens please notify me, thanks!.


