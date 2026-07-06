import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react-native';
import { createStyles } from './RateBanner.styles';

const bannerImage =
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80';

const formatPrice = (value) =>
  Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 });

const RateBanner = ({ rate, theme, onViewRates, compact = false }) => {
  const styles = useMemo(() => createStyles(theme, compact), [theme, compact]);

  if (!rate || rate.currentPrice === null) {
    return null;
  }

  const isUp = (rate.change ?? 0) >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = isUp ? theme.success : theme.danger;

  return (
    <View style={styles.card}>
      {!compact ? (
        <>
          <Image source={{ uri: bannerImage }} style={styles.sideImage} />
          <View style={styles.sideImageShade} />
        </>
      ) : null}

      <View style={styles.content}>
        {compact ? (
          <Text style={styles.compactLabel}>TODAY&apos;S {rate.name?.toUpperCase()} RATE</Text>
        ) : (
          <Text style={styles.label}>TODAY&apos;S {rate.name?.toUpperCase()} RATE</Text>
        )}
        <View style={styles.priceRow}>
          <Text style={styles.rupee}>₹</Text>
          <Text style={styles.price}>{formatPrice(rate.currentPrice)}</Text>
          <Text style={styles.unit}>/gm</Text>
        </View>

        {rate.change !== null && (
          <View style={styles.changeRow}>
            <TrendIcon size={compact ? 11 : 13} color={trendColor} />
            <Text style={[styles.changeText, { color: trendColor }]}>
              {formatPrice(Math.abs(rate.change))} ({Math.abs(rate.changePercent ?? 0)}%)
            </Text>
            {!compact ? <Text style={styles.changeSuffix}>from yesterday</Text> : null}
          </View>
        )}

        {compact && rate.asOfDate ? (
          <Text style={styles.updatedText}>Updated {rate.asOfDate}</Text>
        ) : null}

        {compact ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.ctaLink, { borderColor: theme.primary }]}
            onPress={onViewRates}
          >
            <Text style={[styles.ctaLinkText, { color: theme.primaryDark }]}>View Rates & Charts</Text>
            <ArrowRight size={11} color={theme.primaryDark} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.ctaButton, { borderColor: theme.primary }]}
            onPress={onViewRates}
          >
            <Text style={[styles.ctaText, { color: theme.primaryLight }]}>View Rates & Charts</Text>
            <ArrowRight size={13} color={theme.primaryLight} />
          </TouchableOpacity>
        )}
      </View>

      {!compact ? (
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      ) : null}
    </View>
  );
};

export default RateBanner;
