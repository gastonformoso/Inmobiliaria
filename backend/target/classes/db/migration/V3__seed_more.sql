INSERT INTO property (title,description,operation_type,property_type,price,currency,province,city,neighborhood,address,bedrooms,bathrooms,rooms,covered_area,total_area,parking_spaces,published,featured)
SELECT 'Casa '||g,'Propiedad número '||g, CASE WHEN g%2=0 THEN 'VENTA' ELSE 'ALQUILER' END,'CASA',100000+g*5000,'USD','Buenos Aires','Ciudad',NULL,'Dir '||g,3,2,3,80+g,90+g,1,true,(g%3=0) FROM generate_series(5,245) g;

INSERT INTO property_image (property_id,image_url,display_order)
SELECT id, '/casa' || ((id % 4)+1) || '.jpg', 0 FROM property WHERE id NOT IN (SELECT property_id FROM property_image);