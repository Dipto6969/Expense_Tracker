import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabNavigator from "./TabNavigator";
import ExpenseDetailsScreen from "../screens/ExpenseDetailsScreen";
import EditExpenseScreen from "../screens/EditExpenseScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const insets = useSafeAreaInsets();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2196F3',
                    paddingTop: insets.top,
                    height: 56 + insets.top,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerStatusBarHeight: 0,
            }}
        >
            <Stack.Screen 
                name="ExpenseTracker" 
                component={TabNavigator} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ExpenseDetails" 
                component={ExpenseDetailsScreen} 
                options={{ title: "Expense Details" }} 
            />
            <Stack.Screen 
                name="EditExpense" 
                component={EditExpenseScreen} 
                options={{ title: "Edit Expense" }} 
            />
        </Stack.Navigator>
    );
}