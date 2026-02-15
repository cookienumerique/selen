import { Colors } from '@/src/constants/theme';
import MaterialDesignIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { createContext, useContext, useRef, useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';

type MenuContextType = {
    closeMenu: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('MenuItem must be used inside Menu');
    }
    return context;
};

type MenuProps = {
    children: React.ReactNode;
};

export const Menu = ({ children }: MenuProps) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, right: 0 });
    const buttonRef = useRef<View>(null);

    const closeMenu = () => setVisible(false);

    const openMenu = () => {
        if (buttonRef.current) {
            buttonRef.current.measureInWindow((_x, y, _width, height) => {
                setPosition({
                    top: y + height + 4,
                    right: 30,
                });
                setVisible(true);
            });
        }
    };

    return (
        <MenuContext.Provider value={{ closeMenu }}>
            <>
                <TouchableOpacity ref={buttonRef} style={{ padding: 16 }} onPress={openMenu}>
                    <MaterialDesignIcons name="dots-vertical" size={24} color={Colors.oakHoneyDark} />
                </TouchableOpacity>

                <Modal transparent visible={visible} animationType="fade">
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={closeMenu}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: position.top,
                                right: position.right,
                                backgroundColor: 'white',
                                borderRadius: 12,
                                paddingVertical: 8,
                                width: 180,
                                shadowColor: '#000',
                                shadowOpacity: 0.15,
                                shadowOffset: { width: 0, height: 4 },
                                shadowRadius: 10,
                                elevation: 8,
                                gap: 0
                            }}
                        >
                            {children}
                        </View>
                    </Pressable>
                </Modal>
            </>
        </MenuContext.Provider>
    );
};