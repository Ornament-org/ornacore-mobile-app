import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CalendarDays, Check, MapPin, Pencil, ShieldCheck, Store } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const getStatusLabel = (status) => String(status || 'Pending').replaceAll('_', ' ');

const ProfileHeroCard = ({ profile, location, memberSince, onEditPress, MetaIcon = CalendarDays }) => {
  const theme = useAppTheme();
  const verified = profile?.status === 'APPROVED';

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.shopArtWrap}>
        <View style={styles.shopArt}>
          <Store size={58} color="#E5C22A" strokeWidth={1.6} />
        </View>
        <View style={styles.cameraBadge}>
          <Camera size={22} color="#FFBE35" strokeWidth={2.2} />
        </View>
      </View>

      <View style={styles.info}>
        <Text
          style={[
            styles.shopName,
            onEditPress && styles.shopNameWithEdit,
            { color: theme.text },
          ]}
          numberOfLines={2}
        >
          {profile?.shopName || 'Your Shop'}
        </Text>

        <View style={[styles.statusPill, { backgroundColor: verified ? '#E7F7EF' : '#FFF8E8' }]}>
          {verified ? (
            <ShieldCheck size={15} color="#0C8A4B" />
          ) : (
            <Check size={15} color="#C58B12" />
          )}
          <Text style={[styles.statusText, { color: verified ? '#0C8A4B' : '#C58B12' }]}>
            {verified ? 'Verified' : getStatusLabel(profile?.status)}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <MapPin size={24} color={theme.muted} />
          <Text style={[styles.metaLine, { color: theme.muted }]} numberOfLines={1}>
            {location || 'Location not added'}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <MetaIcon size={24} color={theme.muted} />
          <Text style={[styles.metaLine, { color: theme.muted }]} numberOfLines={1}>
            Member since {memberSince}
          </Text>
        </View>
      </View>

      {onEditPress ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onEditPress}
          style={styles.editButton}
        >
          <Pencil size={16} color="#C58B12" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProfileHeroCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    borderWidth: 1,
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 28,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  shopArtWrap: {
    width: 104,
    height: 104,
    marginRight: 24,
  },
  shopArt: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: '#E5C22A',
    backgroundColor: '#3A2A12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5C22A',
    backgroundColor: '#151719',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  shopName: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginBottom: 8,
  },
  shopNameWithEdit: {
    paddingRight: 118,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'capitalize',
  },
  metaLine: {
    flex: 1,
    fontSize: 22,
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 7,
  },
  editButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    minHeight: 42,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFF8E8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  editText: {
    color: '#C58B12',
    fontSize: 14,
    fontWeight: '800',
  },
});
