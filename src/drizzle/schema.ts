// import { restaurantOwnerTable } from './schema';
import { relations } from "drizzle-orm";
import { boolean, date, datetime, decimal } from "drizzle-orm/mysql-core";
import { PgDate } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


// =======================TYPES USED AT USER.SERVICE.TS====================
export type TSuser = typeof usersTable.$inferSelect
export type TIuser = typeof usersTable.$inferInsert

export type TSstate = typeof stateTable.$inferSelect
export type TIstate = typeof stateTable.$inferInsert
//=================creating tables=============

// ===========state table============
export const stateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    code: varchar("code").notNull(),
})
 
export const stateRelation = relations(stateTable,({one})=>({
    city:one(cityTable,{
        fields: [stateTable.id],
        references:[cityTable.state_id]
    })

}))
// ===========city table============

export const cityTable = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    state_id: integer("state_id").notNull().references(()=> stateTable.id, {onDelete: "cascade"}),
   
})
// city and state  // city and restaurant // city and address
export const cityRelations = relations(cityTable,({one,many})=>({
    state:many(stateTable),
    restaurant: one(restaurantTable, {
        fields: [cityTable.id],
        references: [restaurantTable.city_id]
    }),
    address: one(addressTable, {
        fields: [cityTable.id],
        references: [addressTable.city_id]
    })
})) 

// ===========restaurant table============

export const restaurantTable = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    street_address: varchar("street_address").notNull(),
    zip_code: varchar("zip_code").notNull(),
    city_id: integer("city_id").notNull().references(()=> cityTable.id, {onDelete: "cascade" }),
})

//restaurant and city n:1 // restaurant and restaurant_owner
export const restaurantRelations =relations(restaurantTable, ({one,many})=>({
    city: many(cityTable),
    restaurantowner: one(restaurantOwnerTable, {
        fields: [restaurantTable.id],
        references: [restaurantOwnerTable.restaurant_id]
    }),
    menuitem: one(menuItemTable, {
        fields: [restaurantTable.id],
        references: [menuItemTable.restaurant_id]
    }),
    order: one(ordersTable, {
        fields: [restaurantTable.id],
        references: [ordersTable.restaurant_id]
    }),

}))

// ===========category table============

export const categoryTable = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
});


export const categoryRelations =relations(categoryTable, ({one,many})=>({
    menuitem: one(menuItemTable, {
        fields: [categoryTable.id],
        references: [menuItemTable.category_id]
    }),
    // menuitem: one(menuItemTable, {
    //     fields: [restaurantTable.id],
    //     references: [menuItemTable.restaurant_id]
    // }),
    // order: one(ordersTable, {
    //     fields: [restaurantTable.id],
    //     references: [ordersTable.restaurant_id]
    // }),

}))
// ===========menu_item table============


export const menuItemTable = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    restaurant_id: integer("restaurant_id").notNull(),
    category_id: integer("category_id").notNull(),
    description: varchar("description").notNull(),
    ingredients: varchar("ingredients").notNull(),
    price: integer("price").notNull(),
    active: varchar("active").notNull()
});

//menuitem and restaurant
// export const menuitemRelations = relations(menuItemTable, ({many}) =>{
//    restaurant: many(restaurantTable)
// })
export const menuitemRelations = relations(menuItemTable,({one,many})=>({
    restaurant:many(restaurantTable),
    category: many(categoryTable),
    ordermenu: one(orderMenuTable, {
        fields: [menuItemTable.id],
        references: [orderMenuTable.menu_item_id]
    }),

   
})) 

// ===========users table============

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    contact_phone: varchar("contact_phone").notNull(),
    phone_verified: varchar("phone").notNull(),
    email: varchar("email").notNull(),
    email_verified: varchar("email_verified").notNull(),
    confirmation_code: varchar("confirmation_code").notNull(),
    password: varchar("password").notNull(),
});


export const userRelations =relations(usersTable, ({one,many})=>({
    // city: many(cityTable),
    restaurantowner: one(restaurantOwnerTable, {
        fields: [usersTable.id],
        references: [restaurantOwnerTable.owner_id]
    }),
    comment: one(commentsTable, {
        fields: [usersTable.id],
        references: [commentsTable.user_id]
    }),
    order: one(ordersTable, {
        fields: [usersTable.id],
        references: [ordersTable.user_id]
    }),
    driver: one(driversTable, {
        fields: [usersTable.id],
        references: [driversTable.user_id]
    }),
    address: one(addressTable, {
        fields: [usersTable.id],
        references: [addressTable.user_id]
    }),

}))
// ===========restaurant_owner table============

export const restaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(()=> restaurantTable.id, {onDelete: "cascade"}),
    owner_id: integer("owner_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
   
});

// restaurantowner and restaurant
export const restaurantownerRelations =relations(restaurantOwnerTable, ({one,many})=>({
    restaurant: many(restaurantTable),
    user: many(usersTable),

}))

// ===========drivers table============

export const driversTable = pgTable("drivers", {
    id: serial("id").primaryKey(),
    car_make: varchar("car_make").notNull(),
    car_model: varchar("car_model").notNull(),
    car_year: integer("car_year").notNull(),
    user_id: integer("user_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
    online: varchar("online").notNull(),
    delivering: varchar("delivering").notNull(),

});
export const driversRelations =relations(driversTable, ({one,many})=>({
    user: many(usersTable),
    order: one(ordersTable, {
        fields: [driversTable.id],
        references: [ordersTable.driver_id]
    }),

}))

// ===========address table============

export const addressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    street_address_1: varchar("street_address_1").notNull(),
    street_address_2: varchar("street_address_2").notNull(),
    zip_code: varchar("zip_code").notNull(),
    delivery_instructions: varchar("delivery_instructions").notNull(),
    user_id: integer("user_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
    city_id: integer("city_id").notNull().references(()=> cityTable.id, {onDelete: "cascade"}),
    
});
 // address and city
 export const addressRelations =relations(addressTable, ({one,many})=>({
    city: many(cityTable),
    user: many(usersTable),
    order: one(ordersTable, {
        fields: [addressTable.id],
        references: [ordersTable.delivery_address_id]
    }),
}))
// ===========orders table============

export const ordersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(()=> restaurantTable.id, {onDelete: "cascade"}),
    estimated_delivery_time: varchar(" estimated_delivery_time").notNull(),
    actual_delivery_time: varchar(" actual_delivery_time").notNull(),
    delivery_address_id: integer("delivery_address_id").notNull().references(()=> addressTable.id, {onDelete: "cascade"}),
    user_id: integer("user_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
    driver_id: integer("driver_id").notNull().references(()=> driversTable.id, {onDelete: "cascade"}),
    price: integer("price").notNull(),
    discount: integer("discount").notNull(),
    final_price: integer("final_price").notNull()
});

//order and restaurant
export const ordersRelations =relations(ordersTable, ({one,many})=>({
    restaurant: many(restaurantTable),
    user: many(usersTable),
    driver: many(driversTable),
    address: many(addressTable),
    orderstatus: one(orderStatusTable, {
        fields: [ordersTable.id],
        references: [orderStatusTable.order_id]
    }),
    comment: one(commentsTable, {
        fields: [ordersTable.id],
        references: [commentsTable.order_id]
    }),
    ordermenuitem: one(orderMenuTable, {
        fields: [ordersTable.id],
        references: [orderMenuTable.order_id]
    }),



}))

// ===========status catalog table============

export const statusCatalogTable = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
});

export const statuscatalogRelations =relations(statusCatalogTable, ({one,many})=>({
    orderstatus: one(orderStatusTable, {
        fields: [statusCatalogTable.id],
        references: [orderStatusTable.status_catalog_id]
    }),
}))

// ===========order_status table============

export const orderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=> ordersTable.id, {onDelete: "cascade"}),
    status_catalog_id: integer("status_catalog_id:").notNull().references(()=> statusCatalogTable.id,{onDelete: "cascade"}),

});

export const orderstatusRelations =relations(orderStatusTable, ({many})=>({
    order: many(ordersTable),
    statuscatalog: many(statusCatalogTable)
}))

// ===========comments table============

export const commentsTable = pgTable("comments", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=> ordersTable.id, {onDelete: "cascade"}),
    user_id: integer("user_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
    comment_text: varchar("comment_text").notNull(),
    is_complaint: varchar("is_complaint").notNull(),
    is_praise: varchar("is_praise").notNull(),
    
    
});

export const commentRelations =relations(commentsTable, ({many})=>({
    user: many(usersTable),
    order: many(ordersTable)
}))

// ===========order_menutable============

export const orderMenuTable = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(()=> ordersTable.id, {onDelete: "cascade"}),
    menu_item_id: integer("menu_item_id").notNull().references(()=> menuItemTable.id, {onDelete: "cascade"}),
    quantity: integer("quantity").notNull(),
    item_price: integer("item_price").notNull()
});

export const ordermenuRelations = relations(orderMenuTable,({one,many})=>({
    menuitem:many(menuItemTable),
    order: many(ordersTable)
    // category: many(categoryTable),
    // ordermenu: one(orderMenuTable, {
    //     fields: [menuItemTable.id],
    //     references: [orderMenuTable.menu_item_id]
    // }),

   
})) 







