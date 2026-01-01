import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

/* SAME THEME */
const COLORS = {
  bg: "#0f0a05",
  surface: "#1a1208",
  surface2: "#120c06",
  border: "#2a1a0c",
  text: "#ffffff",
  muted: "#f0c7a0",
  muted2: "#c9a27a",
  accent: "#ff8c1a",
  danger: "#ff6b6b",
};

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  minutes: number;
  price: "$" | "$$" | "$$$";
  distanceKm: number;
  imageUrl: string;
};

type Dish = {
  id: string;
  name: string;
  desc: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
};

/* ✅ Use the SAME restaurants list you used in Discover (add/remove as you like) */
const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Island Bites",
    cuisine: "Sri Lankan",
    rating: 4.7,
    minutes: 18,
    price: "$$",
    distanceKm: 1.2,
    imageUrl:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Spice Leaf",
    cuisine: "Indian",
    rating: 4.6,
    minutes: 22,
    price: "$$",
    distanceKm: 2.4,
    imageUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Dockside Pizza",
    cuisine: "Pizza",
    rating: 4.4,
    minutes: 15,
    price: "$",
    distanceKm: 0.9,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Burger Yard",
    cuisine: "Burgers",
    rating: 4.3,
    minutes: 12,
    price: "$",
    distanceKm: 1.0,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
  },
  {
  id: "5",
  name: "Lotus Cafe",
  cuisine: "Cafe",
  rating: 4.5,
  minutes: 10,
  price: "$",
  distanceKm: 0.6,
  imageUrl:
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "6",
  name: "Golden Wok",
  cuisine: "Chinese",
  rating: 4.2,
  minutes: 25,
  price: "$$",
  distanceKm: 3.1,
  imageUrl:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "7",
  name: "Curry Leaf",
  cuisine: "Indian",
  rating: 4.8,
  minutes: 20,
  price: "$$",
  distanceKm: 1.5,
  imageUrl:
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "8",
  name: "Street Wok",
  cuisine: "Chinese",
  rating: 4.1,
  minutes: 17,
  price: "$",
  distanceKm: 1.1,
  imageUrl:
    "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "9",
  name: "Little Italy",
  cuisine: "Pizza",
  rating: 4.6,
  minutes: 14,
  price: "$$",
  distanceKm: 0.8,
  imageUrl:
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "10",
  name: "Urban Burger Co.",
  cuisine: "Burgers",
  rating: 4.4,
  minutes: 16,
  price: "$",
  distanceKm: 1.9,
  imageUrl:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "11",
  name: "Cafe Aroma",
  cuisine: "Cafe",
  rating: 4.3,
  minutes: 9,
  price: "$",
  distanceKm: 0.5,
  imageUrl:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
},
{
  id: "12",
  name: "Royal Lanka",
  cuisine: "Sri Lankan",
  rating: 4.9,
  minutes: 23,
  price: "$$",
  distanceKm: 2.7,
  imageUrl:
    "https://images.unsplash.com/photo-1600628422019-17d2d7c63b15?auto=format&fit=crop&w=1200&q=80",
},

];

/*  Different dishes per restaurant */
const MENU_BY_RESTAURANT: Record<string, Dish[]> = {
  "1": [
    { id: "1-1", name: "Chicken Kottu", desc: "Chopped roti, chicken, egg, spicy gravy", price: "£8.50", spicy: true },
    { id: "1-2", name: "String Hoppers", desc: "With dhal curry + coconut sambol", price: "£6.00", veg: true },
    { id: "1-3", name: "Lamprais", desc: "Rice bundle with chicken curry + sambol", price: "£9.00" },
    { id: "1-4", name: "Watalappan", desc: "Sri Lankan coconut-jaggery pudding", price: "£4.50", veg: true },
  ],
  "2": [
    { id: "2-1", name: "Butter Chicken", desc: "Creamy tomato curry", price: "£9.50" },
    { id: "2-2", name: "Paneer Tikka", desc: "Chargrilled paneer, mint chutney", price: "£7.00", veg: true },
    { id: "2-3", name: "Garlic Naan", desc: "Soft naan with garlic butter", price: "£2.50", veg: true },
  ],
  "3": [
    { id: "3-1", name: "Margherita", desc: "Tomato, mozzarella, basil", price: "£7.50", veg: true },
    { id: "3-2", name: "Pepperoni", desc: "Pepperoni + mozzarella", price: "£8.50" },
    { id: "3-3", name: "BBQ Chicken", desc: "BBQ sauce, chicken, onions", price: "£9.00" },
  ],
  "4": [
    { id: "4-1", name: "Classic Cheeseburger", desc: "Beef patty, cheese, house sauce", price: "£8.00" },
    { id: "4-2", name: "Spicy Chicken Burger", desc: "Crispy chicken, chilli mayo", price: "£8.50", spicy: true },
    { id: "4-3", name: "Loaded Fries", desc: "Cheese + jalapeños + sauce", price: "£4.50", veg: true },
  ],
  "5": [
  { id: "5-1", name: "Iced Latte", desc: "Espresso + milk + ice", price: "£3.20", veg: true },
  { id: "5-2", name: "Avocado Toast", desc: "Sourdough, avocado, chilli flakes", price: "£5.80", veg: true },
  { id: "5-3", name: "Blueberry Pancakes", desc: "Fluffy stack with maple syrup", price: "£6.50", veg: true },
  { id: "5-4", name: "Chocolate Brownie", desc: "Warm brownie, soft centre", price: "£3.90", veg: true },
],

"6": [
  { id: "6-1", name: "Sweet & Sour Chicken", desc: "Crispy chicken, sweet sour sauce", price: "£8.80" },
  { id: "6-2", name: "Egg Fried Rice", desc: "Classic fried rice, spring onion", price: "£4.50", veg: true },
  { id: "6-3", name: "Veg Spring Rolls", desc: "Crispy rolls with dip", price: "£4.20", veg: true },
  { id: "6-4", name: "Chilli Noodles", desc: "Stir-fried noodles, spicy kick", price: "£7.20", spicy: true, veg: true },
],

"7": [
  { id: "7-1", name: "Chicken Biryani", desc: "Fragrant rice, spiced chicken", price: "£9.80", spicy: true },
  { id: "7-2", name: "Masala Dosa", desc: "Crispy dosa with potato masala", price: "£7.40", veg: true },
  { id: "7-3", name: "Chana Masala", desc: "Chickpea curry, rich gravy", price: "£7.90", veg: true, spicy: true },
  { id: "7-4", name: "Mango Lassi", desc: "Sweet mango yoghurt drink", price: "£3.50", veg: true },
],

"8": [
  { id: "8-1", name: "Kung Pao Chicken", desc: "Peanuts, chilli, stir-fry sauce", price: "£9.20", spicy: true },
  { id: "8-2", name: "Beef Chow Mein", desc: "Noodles, beef, veggies", price: "£8.90" },
  { id: "8-3", name: "Mapo Tofu", desc: "Soft tofu, chilli bean sauce", price: "£8.20", spicy: true, veg: true },
  { id: "8-4", name: "Dumplings (6)", desc: "Steamed dumplings with soy dip", price: "£5.50" },
],

"9": [
  { id: "9-1", name: "Truffle Mushroom", desc: "Mushroom, truffle oil, mozzarella", price: "£9.50", veg: true },
  { id: "9-2", name: "Diavola", desc: "Spicy salami, chilli, mozzarella", price: "£9.80", spicy: true },
  { id: "9-3", name: "Garlic Bread", desc: "Toasted, buttery garlic bread", price: "£3.80", veg: true },
  { id: "9-4", name: "Tiramisu", desc: "Coffee dessert, cocoa top", price: "£4.90", veg: true },
],

"10": [
  { id: "10-1", name: "Double Smash Burger", desc: "2 patties, cheese, house sauce", price: "£9.50" },
  { id: "10-2", name: "Spicy Loaded Chicken", desc: "Crispy chicken, chilli mayo", price: "£9.20", spicy: true },
  { id: "10-3", name: "Onion Rings", desc: "Crispy rings, dipping sauce", price: "£4.20", veg: true },
  { id: "10-4", name: "Milkshake", desc: "Vanilla / chocolate / strawberry", price: "£4.50", veg: true },
],

"11": [
  { id: "11-1", name: "Flat White", desc: "Smooth espresso + milk", price: "£3.10", veg: true },
  { id: "11-2", name: "Croissant", desc: "Buttery, flaky pastry", price: "£2.60", veg: true },
  { id: "11-3", name: "Caesar Salad", desc: "Romaine, parmesan, croutons", price: "£6.90" },
  { id: "11-4", name: "Carrot Cake", desc: "Spiced cake, cream frosting", price: "£4.10", veg: true },
],

"12": [
  { id: "12-1", name: "Seafood Rice", desc: "Rice with prawns + spices", price: "£10.50", spicy: true },
  { id: "12-2", name: "Pol Roti & Lunu Miris", desc: "Coconut roti with chilli sambol", price: "£6.20", veg: true, spicy: true },
  { id: "12-3", name: "Fish Ambul Thiyal", desc: "Sour fish curry (Sri Lankan)", price: "£9.60", spicy: true },
  { id: "12-4", name: "Faluda", desc: "Sweet dessert drink", price: "£4.80", veg: true },
],

};

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const restaurant = useMemo(
    () => RESTAURANTS.find((r) => r.id === id),
    [id]
  );

  const menu = useMemo(() => MENU_BY_RESTAURANT[id ?? ""] ?? [], [id]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ color: COLORS.text, padding: 16 }}>Restaurant not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>

      <Image source={{ uri: restaurant.imageUrl }} style={styles.hero} />

      <View style={styles.metaCard}>
        <Text style={styles.metaLine}>
          {restaurant.cuisine} • {restaurant.price} • {restaurant.minutes} min • {restaurant.distanceKm.toFixed(1)} km
        </Text>
        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={18} color={COLORS.accent} />
          <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Popular dishes</Text>

      <FlatList
        data={menu}
        keyExtractor={(d) => d.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <View style={{ flex: 1 }}>
              <View style={styles.dishTopRow}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>{item.price}</Text>
              </View>
              <Text style={styles.dishDesc}>{item.desc}</Text>

              <View style={styles.badgesRow}>
                {item.spicy ? <Badge text="Spicy" /> : null}
                {item.veg ? <Badge text="Veg" /> : null}
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: COLORS.muted, paddingHorizontal: 16 }}>
            No menu items yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900" },

  hero: { width: "100%", height: 190 },

  metaCard: {
    marginHorizontal: 16,
    marginTop: -16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  metaLine: { color: COLORS.muted, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  ratingText: { color: COLORS.text, fontWeight: "900" },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },

  dishCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  dishTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dishName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
  dishPrice: { color: COLORS.accent, fontWeight: "900" },
  dishDesc: { color: COLORS.muted, marginTop: 6 },

  badgesRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: { color: COLORS.muted, fontWeight: "800", fontSize: 12 },

  backBtn: {
    margin: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  backText: { color: COLORS.bg, fontWeight: "900" },
});
