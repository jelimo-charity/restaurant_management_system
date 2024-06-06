ALTER TABLE "order_menu_item" DROP CONSTRAINT "order_menu_item_order_menu_item_menu_item_id_fk";
--> statement-breakpoint
ALTER TABLE "order_menu_item" ADD COLUMN "menu_item_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order_menu_item" DROP COLUMN IF EXISTS "order_menu_item";