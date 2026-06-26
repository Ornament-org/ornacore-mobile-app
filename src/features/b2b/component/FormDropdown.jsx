import React, { useState } from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChevronDown,
  Check,
} from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';


const FormDropdown = ({
  label,
  placeholder = 'Select',
  value,
  options = [],
  onSelect,
  error,
  Icon,
}) => {
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    options.find(item => item.value === value)?.label;

  const handleSelect = item => {
    onSelect(item.value);
    setVisible(false);
  };

  return (
    <>
      <View style={styles.wrapper}>
        {label ? (
          <Text
            style={[
              styles.label,
              { color: theme.text },
            ]}
          >
            {label}
          </Text>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setVisible(true)}
          style={[
            styles.container,
            {
              borderColor: error
                ? '#E5484D'
                : theme.border,
              backgroundColor:
                theme.surface || '#FFFFFF',
            },
          ]}
        >
          {Icon ? (
            <Icon
              size={18}
              color={theme.muted}
            />
          ) : null}

          <Text
            style={[
              styles.valueText,
              {
                color: selectedLabel
                  ? theme.text
                  : theme.muted,
              },
            ]}
          >
            {selectedLabel || placeholder}
          </Text>

          <ChevronDown
            size={18}
            color={theme.muted}
          />
        </TouchableOpacity>

        {error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : null}
      </View>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor:
                  theme.surface || '#FFF',
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: theme.text },
              ]}
            >
              {label}
            </Text>

            <FlatList
              data={options}
              keyExtractor={item =>
                item.value.toString()
              }
              renderItem={({ item }) => {
                const selected =
                  item.value === value;

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      handleSelect(item)
                    }
                    style={styles.optionRow}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: selected
                            ? '#C99632'
                            : theme.text,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>

                    {selected ? (
                      <Check
                        size={18}
                        color="#C99632"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default FormDropdown;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  container: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,

    flexDirection: 'row',
    alignItems: 'center',
  },

  valueText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  errorText: {
    color: '#E5484D',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    maxHeight: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },

  optionRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
});