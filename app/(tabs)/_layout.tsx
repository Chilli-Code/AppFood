import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from "react-native";


const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    
    <View className="tab-icon">
        <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

const NumberCart = () => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    return (
        <Text
            style={{
                position: 'absolute',
                top: 16,
                right: 11,
                backgroundColor: '#FFA500',
                color: 'white',
                borderRadius: 10,
                fontWeight: 'bold',
                opacity: 0.86,
                fontSize: 12,
                minWidth: 18,
                textAlign: 'center',
                paddingHorizontal: 4,
                paddingVertical: 1,
                overflow: 'hidden',
            }}
        >
            {totalItems}
        </Text>
    )
}


export default function TabLayout() {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuthStore();
    //const isAuthenticated = false;
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();


    if (!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: 'absolute',
                bottom: 40,
                backgroundColor: 'white',
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: t('home'),
                    tabBarIcon: ({ focused }) => <TabBarIcon title={t('home')} icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: t('search'),
                    tabBarIcon: ({ focused }) => <TabBarIcon title={t('search')} icon={images.search} focused={focused} />
                }}
            />
// ...existing code...
            <Tabs.Screen
                name='cart'
                options={{
                    title: t('cart'),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TabBarIcon title={t('cart')} icon={images.bag} focused={focused} />
                            {totalItems > 0 && <NumberCart />}
                        </View>
                    ),
                }}
            />
// ...existing code...
            <Tabs.Screen
                name='profile'
                options={{
                    title: t('profileT'),
                    tabBarIcon: ({ focused }) => <TabBarIcon title={t('profileT')} icon={images.person} focused={focused} />
                }}
            />
        </Tabs>
    );
}