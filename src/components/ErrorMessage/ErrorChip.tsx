import React from 'react';
import {Text, View} from 'react-native';

import {ErrorType} from '@/types/error';
import styles from './ErrorChip.styles';

type ErrorChipProps = {
  status: ErrorType;
};

const ErrorChip = ({status}: ErrorChipProps) => {
  switch (status) {
    case 'success':
      return (
        <View style={styles.backgroundSuccess}>
          <Text style={styles.message}>
            Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
          </Text>
        </View>
      );
    case 'empty':
      return (
        <View style={styles.backgroundError}>
          <Text style={styles.message}>
            Không tìm thấy sản phẩm! Vui lòng thử lại.
          </Text>
        </View>
      );
    case 'failed':
      return (
        <View style={styles.backgroundError}>
          <Text style={styles.message}>Không thể kết nối đến server.</Text>
        </View>
      );
    default:
      return (
        <View style={styles.backgroundNeutral}>
          <Text style={styles.message}>Working...</Text>
        </View>
      );
  }
};

export default ErrorChip;
