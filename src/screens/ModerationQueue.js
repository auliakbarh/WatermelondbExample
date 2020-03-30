import React from 'react';
import {Text, FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';

import Comment from '../components/Comment';
import styles from '../styles/styles';
import {extractId} from '../utils/utils';

const renderComment = ({item}) => <Comment comment={item} key={item.id} />;

const ModerationQueue = ({blog, nastyComments}) => (
  <FlatList
    ListHeaderComponent={() => (
      <>
        <Text style={styles.title}>Moderation queue for {blog.name}</Text>
        <Text style={styles.subtitle}>
          Nasty comments ({nastyComments.length})
        </Text>
      </>
    )}
    data={nastyComments}
    renderItem={renderComment}
    keyExtractor={extractId}
  />
);

const enhance = withObservables(['blog'], ({blog}) => ({
  blog: blog.observe(),
  nastyComments: blog.nastyComments.observe(),
}));

export default enhance(ModerationQueue);
