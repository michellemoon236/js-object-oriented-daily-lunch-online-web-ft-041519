// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    // - returns a list of all deliveries placed in a neighborhood
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  customers() {
    // - returns all of the customers that live in a particular neighborhood
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }
  meals() {
    // - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)
    let meals = this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
    let unique = [...new Set(meals)]
    return unique
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId
    store.customers.push(this);
  }

  deliveries() {
    // — returns all of the deliveries that customer has received
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id
      }.bind(this)
    )
  }

  meals() {
  // - returns all meals that a customer has ordered
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    })
  }

  totalSpent() {
  // - returns the total amount that the customer has spent on food.
  let spent = 0
  this.meals().forEach(function(meal){
    spent += meal.price
  })
  return spent
  }
  
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries() {
    // - returns all of the deliveries associated with a particular meal.
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id 
      }.bind(this)
    )
  }
  customers() {
    // - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
    return this.deliveries().map(function(delivery) {
      return delivery.customer()
    })
  }
  static byPrice() {
    // A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
    return store.meals.sort(function(a, b) {
      return b.price-a.price;
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId 
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    // - returns the meal associated with a particular delivery
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
  }
  customer() {
  // - returns the customer associated with a particular delivery
      return store.customers.find(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    )
  }
  neighborhood() {
  // - returns the neighborhood associated with a particular delivery
    return store.neighborhoods.find(
    function(neighborhood) {
      return neighborhood.id === this.neighborhoodId
    }.bind(this)
  )
  }
}