import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { data } from "@/data/shoppingList";

export default function Index() {
  const [shoppingList, setShoppingList] = useState(data.sort((a, b) => a.purchased - b.purchased));
  const [name, setName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [editingQuantity, setEditingQuantity] = useState(''); 
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousItems, setPreviousItems] = useState([]);

  const addItem = () => {
    if (name.trim() && !isNaN(newItemQuantity) && Number(newItemQuantity) > 0) {
      const newId = shoppingList.length > 0 ? shoppingList.length + 1 : 1;
      const newList = [{ id: newId, name, quantity: parseInt(newItemQuantity), purchased: false }, ...shoppingList];
      setShoppingList(newList.sort((a, b) => a.purchased - b.purchased));
      setName('');
      setNewItemQuantity('');
    } else {
      alert("Please enter a valid item name and quantity greater than 0.");
    }
  };

  const togglePurchased = (id) => {
    setShoppingList(shoppingList.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const removeItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (!isNaN(newQuantity) && Number(newQuantity) > 0) {
      setShoppingList(shoppingList.map(item =>
        item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
      ));
      setEditingItemId(null); // Clear editing state after updating
    } else {
      alert('Please enter a valid quantity');
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(itemId => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const removeSelectedItems = () => {
    setPreviousItems(shoppingList); 
    setShoppingList(shoppingList.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]); 
  };

  const removeAllItems = () => {
    setPreviousItems(shoppingList); 
    setShoppingList([]);
    setSelectedItems([]); 
  };

  const undoDeleteAll = () => {
    setShoppingList(previousItems);
    setPreviousItems([]); 
  };

  const renderRightActions = (id) => (
    <Pressable onPress={() => removeItem(id)} style={styles.swipeAction}>
      <MaterialCommunityIcons name="delete-circle" size={36} color="white" />
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.todoItem}>
        <View style={styles.itemDetails}>
          <Pressable onPress={() => togglePurchased(item.id)}>
            <Text style={[styles.todoText, item.purchased && styles.completedText]}>
              {item.name} -  {item.quantity}
            </Text>
          </Pressable>
  
          <View style={styles.quantityCheckboxContainer}>
            {editingItemId === item.id ? (
              <TextInput
                style={styles.input}
                value={String(editingQuantity)}
                keyboardType="numeric"
                onChangeText={setEditingQuantity}
                onBlur={() => updateQuantity(item.id, editingQuantity)}
              />
            ) : (
              <Pressable onPress={() => { 
                setEditingItemId(item.id); 
                setEditingQuantity(String(item.quantity)); 
              }}>
                <MaterialCommunityIcons name="pencil" size={24} color="white" />
              </Pressable>
            )}
  
            <Pressable onPress={() => toggleSelectItem(item.id)}>
              <MaterialCommunityIcons
                name={selectedItems.includes(item.id) ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Swipeable>
  );
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add item.."
            placeholderTextColor="white"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={newItemQuantity}
            onChangeText={setNewItemQuantity}
          />
          <Pressable onPress={addItem} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'black' }, styles.addButton]}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
          ListEmptyComponent={<Text style={styles.emptyText}>Your shopping list is empty!</Text>}
        />

        <View style={styles.deleteActions}>
          <Pressable onPress={removeAllItems} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete All</Text>
          </Pressable>

          {selectedItems.length > 0 && (
            <Pressable onPress={removeSelectedItems} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Selected</Text>
            </Pressable>
          )}

          {shoppingList.length === 0 && previousItems.length > 0 && (
            <Pressable onPress={undoDeleteAll} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Undo Delete All</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    width: '100%',
    backgroundColor: 'gray',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5, // Reduced padding to make the box smaller
    marginRight: 10,
    fontSize: 18,
    color: 'white',
    minWidth: 50, // Reduced width to make the input smaller
  },
  addButton: {
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1, 
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
  },
  swipeAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
  deleteActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  // Additional style to ensure consistent spacing between quantity and checkbox
  quantityCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 120,  // ensures enough space for both elements
    marginLeft: 10, // space between the editing quantity and checkbox
  },
});
